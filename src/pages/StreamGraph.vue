<template>
  <q-page padding class="bg-grey-3 flex flex-center">
    <EmptyState v-if="isEmptyState" icon="radio" header-text="You don't have any streams"
                body-text="To create your first stream, click on the button below">
      <template v-slot:buttons>
        <q-btn size="md" rounded color="secondary" label="Create a stream"></q-btn>
      </template>
    </EmptyState>
    <div v-else class="full-width">
      <div class="text-h6 q-mb-md">Stream Visualisation</div>
      <q-card class="full-width">
        <q-card-section>
          <StreamDisplay v-for="(stream, index) in $streamStore.getAllStreams" :key="stream.uuid"
                         :min="stream.startTime" :max="stream.endTime" :stream-color="stream.color"
                         :stream-name="stream.name"></StreamDisplay>
        </q-card-section>
      </q-card>
      <q-separator class="q-my-md"></q-separator>
      <div class="text-h6 q-mb-md">Stream Statistics</div>
      <div class="flex q-gutter-md">
        <q-card>
          <q-card-section>
            <div class="text-h6">Total Stream Time</div>
            <div>Represents how much gross stream time we have</div>
            <div class="statistic">{{ floatToTimeString(totalStreamTime) }}</div>
          </q-card-section>
        </q-card>
        <q-card>
          <q-card-section>
            <div class="text-h6">Rationalised Stream Time</div>
            <div>Represents how much non-overlapping stream time we have</div>
            <div class="statistic">{{ floatToTimeString(rationalisedStreamTime) }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, toRaw} from "vue";
import {useStreamStore} from "stores/StreamStore";
import EmptyState from "components/EmptyState.vue";
import StreamDisplay from "components/StreamDisplay.vue";
import {floatToTimeString, timeStringToFloat} from "src/abstract/Utils";
import {IRadioStream} from "src/models/interfaces";

const $streamStore = useStreamStore();
const rationalisedStreamTime = ref();

const isEmptyState = computed(() => {
  return $streamStore.getAllStreams.length === 0
})

const totalStreamTime = computed(() => {
  return $streamStore.getAllStreams.reduce((total, timeObj) => total + (timeStringToFloat(timeObj.endTime) - timeStringToFloat(timeObj.startTime)), 0);
})

let allSessions: IRadioStream[] = [];

onMounted(async () => {
  if (process.env.CLIENT) {
    await $streamStore.fetchStreamsFromServer();
  }
  // Let's grab the sessions from the store
  allSessions = toRaw($streamStore.getAllStreams);
  // First let's sort the streams by starting time
  allSessions.sort((a: IRadioStream, b: IRadioStream) => {
    return timeStringToFloat(a.startTime) < timeStringToFloat(b.startTime) ? -1 : 1
  })

  // Set up a var to calculate overlap time
  let overlapTime: number = 0;

  // Now let's loop through the sorted list
  allSessions.forEach((_session, _index) => {
    if (_index === allSessions.length - 1) return

    let overlap: number = 0;

    // Convert the string times to a float
    const endTimeFloat: number = timeStringToFloat(allSessions[_index].endTime);
    const nextStartTimeFloat: number = timeStringToFloat(allSessions[_index + 1].startTime);
    const nextEndTimeFloat: number = timeStringToFloat(allSessions[_index + 1].endTime);

    if (nextStartTimeFloat < endTimeFloat) {
      // If the next entry's start time overlaps the current entry, count the overlap
      if (endTimeFloat > nextEndTimeFloat) {
        // If the next entry's end time is before the current entry's end time, we can ignore it
        return
      } else {
        // Calculate overlap time
        overlap = endTimeFloat - nextStartTimeFloat;
      }
    }
    // Add the resulting overlap to the total overlap
    overlapTime += overlap;
  })

  // Subtract the overlap time from the total time
  rationalisedStreamTime.value = totalStreamTime.value - overlapTime
})
</script>

<template>
  <q-page padding class="bg-grey-3 flex flex-center">
    <EmptyState v-if="isEmptyState" icon="radio" header-text="You don't have any streams"
                body-text="To create your first stream, click on the button below">
      <template v-slot:buttons>
        <q-btn size="md" rounded color="secondary" label="Create a stream" @click="addStream"></q-btn>
      </template>
    </EmptyState>
    <q-card v-else>
      <q-card-section>
        <StreamEditor v-for="(stream, index) in $streamStore.getAllStreams" :key="stream.uuid" :color="stream.color"
                      :start-time="stream.startTime" :end-time="stream.endTime" :name="stream.name"
                      :uuid="stream.uuid"></StreamEditor>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn color="primary" rounded no-caps label="Add a new stream" @click="addStream"></q-btn>
      </q-card-actions>
    </q-card>
  </q-page>

</template>

<script setup lang="ts">
import {v4} from 'uuid'
import {computed} from "vue";
import {useStreamStore} from "stores/StreamStore";
import EmptyState from "components/EmptyState.vue";
import StreamEditor from "components/StreamEditor.vue";
import {useQuasar} from "quasar";
import {IRadioStream} from "src/models/interfaces";

const $q = useQuasar()
const $streamStore = useStreamStore();

const isEmptyState = computed(() => {
  if (!$streamStore) return true;
  return $streamStore.getAllStreams.length === 0
})

const addStream = () => {
  $q.dialog({
    title: 'Add a new stream',
    message: 'Please name your new stream (Minimum 3 characters)',
    prompt: {
      model: '',
      isValid: val => val.length > 2,
      type: 'text' // optional
    },
    cancel: true,
    persistent: true
  }).onOk(data => {
    const duplicateName: boolean = $streamStore.getAllStreams.some((_stream: IRadioStream) => {
      return data.toLowerCase() === _stream.name.toLowerCase()
    })
    if (duplicateName) {
      $q.notify({
        icon: 'mdi-alert-circle',
        position: "bottom-right",
        caption: 'Another stream with this name already exists. Please choose another name.',
        color: 'negative',
        timeout: 2000
      })
    } else {
      $streamStore.storeStream({
        name: data,
        startTime: "00:00",
        endTime: "12:00",
        color: "#999999",
        uuid: v4()
      })
      $q.notify({
        icon: 'mdi-check-bold',
        position: "bottom-right",
        caption: `Stream ${data} created successfully.`,
        color: 'positive',
        timeout: 2000
      })
    }

  })

}

</script>

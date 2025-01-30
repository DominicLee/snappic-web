<template>
  <div class="flex items-center q-pa-xs bg-white q-gutter-sm">
    <q-input v-model="nameRef" filled label="Name"></q-input>
    <q-input filled v-model="startTimeRef" mask="time" label="Start Time" :rules="['time']" hide-bottom-space>
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="startTimeRef">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat/>
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input filled v-model="endTimeRef" mask="time" label="End Time" :rules="['time']" hide-bottom-space>
      <template v-slot:append>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-time v-model="endTimeRef">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat/>
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input
      filled
      v-model="colorRef"
      class="my-input"
      label="Colour"
    >
      <template v-slot:append>
        <q-icon name="colorize" class="cursor-pointer" :style="`color: ${colorRef}`">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-color v-model="colorRef"/>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-btn round flat color="primary" icon="mdi-delete" @click="confirmDelete"></q-btn>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {useStreamStore} from "stores/StreamStore";
import {useQuasar} from "quasar";

const $streamStore = useStreamStore();
const $q = useQuasar();

const props = defineProps({
  uuid: String,
  startTime: String,
  endTime: String,
  color: String,
  name: String
})

const uuidRef = ref<string | undefined>();
const startTimeRef = ref<string | undefined>();
const endTimeRef = ref<string | undefined>();
const colorRef = ref<string | undefined>();
const nameRef = ref<string | undefined>();

watch(startTimeRef, (value, oldValue, onCleanup) => {
  $streamStore.updateStream(uuidRef.value as string, 'startTime', value as string);
})

watch(endTimeRef, (value, oldValue, onCleanup) => {
  $streamStore.updateStream(uuidRef.value as string, 'endTime', value as string);
})

watch(colorRef, (value, oldValue, onCleanup) => {
  $streamStore.updateStream(uuidRef.value as string, 'color', value as string);
})

watch(nameRef, (value, oldValue, onCleanup) => {
  $streamStore.updateStream(uuidRef.value as string, 'name', value as string);
})

onMounted(() => {
  uuidRef.value = props.uuid;
  startTimeRef.value = props.startTime;
  endTimeRef.value = props.endTime;
  colorRef.value = props.color;
  nameRef.value = props.name;
})

const confirmDelete = () => {
  $q.dialog({
    title: 'Confirm deletion',
    message: `Are you sure you want to delete stream ${nameRef.value}?`,
    cancel: 'Cancel'
  }).onOk(() => {
    $streamStore.deleteStream(props.uuid as string)
  })
}
</script>

<style lang="scss">

</style>

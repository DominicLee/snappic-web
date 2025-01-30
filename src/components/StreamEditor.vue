<template>
  <div class="flex items-center q-pa-xs bg-white q-gutter-sm">
    <q-input v-model="nameRef" filled label="Name"
             :rules="[ val => val.length > 2 || 'Minimum of 3 characters' ]"></q-input>
    <q-input filled v-model="startTimeRef" :error="!!startTimeError" :error-message="startTimeError as string"
             mask="time" label="Start Time" :rules="['time']">
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
    <q-input filled v-model="endTimeRef" :error="!!endTimeError" :error-message="endTimeError as string" mask="time"
             label="End Time" :rules="['time']">
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
      style="padding-bottom: 20px"
    >
      <template v-slot:append>
        <q-icon name="colorize" class="cursor-pointer" :style="`color: ${colorRef}`">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-color v-model="colorRef"/>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-btn style="margin-bottom: 20px" v-if="!isDirty" round flat color="primary" icon="mdi-delete"
           @click="confirmDelete"></q-btn>
    <q-btn style="margin-bottom: 20px" v-else round flat color="red" icon="mdi-content-save"
           @click="saveStream" class="animated tada slower"></q-btn>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
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

const startTimeError = ref<string | undefined>("");
const endTimeError = ref<string | undefined>("");

const isDirty = ref<boolean>(false);

watch(startTimeRef, (value, oldValue, onCleanup) => {
  if (oldValue !== undefined) {
    isDirty.value = true
  }
  if (value > endTimeRef.value) {
    endTimeError.value = `Start time cannot be after end time.`;
  } else {
    endTimeError.value = '';
  }
  $streamStore.updateStream(uuidRef.value as string, 'startTime', value as string);
})

watch(endTimeRef, (value, oldValue, onCleanup) => {
  if (oldValue !== undefined) {
    isDirty.value = true
  }
  if (value < startTimeRef.value) {
    endTimeError.value = `Start time cannot be after end time.`;
  } else {
    endTimeError.value = '';
  }
  $streamStore.updateStream(uuidRef.value as string, 'endTime', value as string);
})

watch(colorRef, (value, oldValue, onCleanup) => {
  if (oldValue !== undefined) isDirty.value = true;
  $streamStore.updateStream(uuidRef.value as string, 'color', value as string);
})

watch(nameRef, (value, oldValue, onCleanup) => {
  if (oldValue !== undefined) isDirty.value = true;
  $streamStore.updateStream(uuidRef.value as string, 'name', value as string);
})

onMounted(() => {
  uuidRef.value = props.uuid;
  startTimeRef.value = props.startTime;
  endTimeRef.value = props.endTime;
  colorRef.value = props.color;
  nameRef.value = props.name;
})

const saveActive = computed(() => {
  return !(startTimeError.value !== '' || endTimeError.value !== '');

})

const confirmDelete = () => {
  $q.dialog({
    title: 'Confirm deletion',
    message: `Are you sure you want to delete stream ${nameRef.value}?`,
    cancel: 'Cancel'
  }).onOk(() => {
    $streamStore.deleteStream(props.uuid as string);
    $q.notify({
      icon: 'mdi-check-bold',
      position: "bottom-right",
      caption: `Stream ${nameRef.value} deleted successfully.`,
      color: 'positive',
      timeout: 2000
    })
  })
}

const saveStream = async () => {
  await $streamStore.updateStreamOnServer(props.uuid as string);
  $q.notify({
    icon: 'mdi-check-bold',
    position: "bottom-right",
    caption: `Stream ${nameRef.value}saved successfully.`,
    color: 'positive',
    timeout: 2000
  })
  isDirty.value = false;
}
</script>

<style lang="scss">

</style>

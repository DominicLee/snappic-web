<template>
  <div class="q-mb-md">
    <div class="flex items-center justify-between">
      <div>{{ streamName }}</div>
      <div>{{ min }} - {{ max }}</div>
    </div>
    <div>
      <q-range readonly thumb-color="white" markers :marker-labels="$q.screen.gt.xs" :step="1" v-model="minMax"
               track-size="16px"
               class="full-width" :min="0" :max="24"></q-range>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {timeStringToFloat} from "src/abstract/Utils";

const props = defineProps({
  min: String,
  max: String,
  streamColor: String,
  streamName: String
})

const minMax = ref()

onMounted(() => {
  minMax.value = {min: timeStringToFloat(props.min as string), max: timeStringToFloat(props.max as string)}
})
</script>
<style lang="scss">

:root {
  --el-color-track: v-bind("streamColor");
}

.q-slider__selection {
  background: v-bind("streamColor");
}
</style>

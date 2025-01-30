<template>
  <q-page padding class="bg-grey-3 flex flex-center">
    <EmptyState v-if="isEmptyState" icon="radio" header-text="You don't have any streams"
                body-text="To create your first stream, click on the button below">
      <template v-slot:buttons>
        <q-btn size="md" rounded color="secondary" label="Create a stream"></q-btn>
      </template>
    </EmptyState>
  </q-page>
</template>

<script setup lang="ts">

import {computed} from "vue";
import {useStreamStore} from "stores/StreamStore";
import EmptyState from "components/EmptyState.vue";

const $streamStore = useStreamStore();

const isEmptyState = computed(() => {
  return $streamStore.getAllStreams.length === 0
})

</script>

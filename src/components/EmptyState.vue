<template>
  <q-card class="empty-state flex column items-center">
    <q-card-section>
      <q-icon class="empty-state-icon animated fadeIn slower" color="primary" size="200px"
              :name="`mdi-${icon}`"></q-icon>
    </q-card-section>
    <q-card-section>
      <div class="gsap-slide-up empty-state-header text-center text-primary q-mb-sm" v-html="headerText"></div>
      <div class="gsap-slide-up empty-state-body text-center" v-html="bodyText"></div>
    </q-card-section>
    <q-card-section>
      <div class="empty-state-buttons">
        <slot name="buttons"></slot>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {useGsap} from "src/mixins/GsapPlugin";

const props = defineProps({
  icon: String,
  headerText: String,
  bodyText: String,
})

const gsapInstance = useGsap();

onMounted(() => {
  const emptyState = document.getElementsByClassName('empty-state');
  gsapInstance.popIn(emptyState, 0, 0);
  const textItems = document.getElementsByClassName('gsap-slide-up');
  gsapInstance.slideInUp(textItems, 20, 0.2, 0.4, 0.5);
  const cardButtons = document.getElementsByClassName('empty-state-buttons');
  gsapInstance.popIn(cardButtons, 0, 0.8);
})
</script>

<style>

</style>

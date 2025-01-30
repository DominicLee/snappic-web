<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ $route.name }}
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-img class="q-ma-md gsap-menu-logo" no-spinner width="120px" src="~assets/snappic-logo.svg"></q-img>
        <q-item class="gsap-menu-item" clickable v-ripple to="/">
          <q-item-section avatar>
            <q-icon color="primary" name="mdi-code-block-tags"/>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-primary">Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="gsap-menu-item" clickable v-ripple to="/list">
          <q-item-section avatar>
            <q-icon color="primary" name="mdi-radio"/>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-primary">Add/Edit Streams</q-item-label>
          </q-item-section>
        </q-item>
        <q-item class="gsap-menu-item" clickable v-ripple to="/graph">
          <q-item-section avatar>
            <q-icon color="primary" name="mdi-radio-tower"/>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-primary">Stream Visualisations</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useGsap} from "src/mixins/GsapPlugin";
import {useRoute} from "vue-router";
import {useStreamStore} from "stores/StreamStore";

const gsapInstance = useGsap();
const $route = useRoute();
const $streamStore = useStreamStore();
const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
  if (leftDrawerOpen.value === true) {
    doMenuAnimation();
  }
}

const doMenuAnimation = () => {
  const menuItems = document.getElementsByClassName('gsap-menu-item');
  gsapInstance.slideInUp(menuItems, 20, 0.2, 0, 0.5);
  const menuLogo = document.getElementsByClassName('gsap-menu-logo');
  gsapInstance.popIn(menuLogo, 0, 0);
}

onMounted(async () => {
  if (process.env.CLIENT) {
    await $streamStore.fetchStreamsFromServer();
  }
})
</script>
<style lang="scss">

</style>

<script setup lang="ts">
import EntryScene from './scene/EntryScene.vue';
import {useGlobalEvent} from './event/global_event'
import {computed} from 'vue'

const globalEventStore = useGlobalEvent();
const currentScene = computed(() => globalEventStore.currentScene);

</script>

<template>
  <div class="wrapper">
    <div class="scene">
      <EntryScene v-if="currentScene === 'entry'"/>
    </div>
  </div>
</template>

<style scoped>
 .wrapper{
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: rgb(38, 38, 38);
  display         : flex;
  justify-content : center;
  align-items     : center;
 } 

.scene{
  background-color: white;
  width: 100%;
  aspect-ratio: 2 / 1;
  position: absolute;
  overflow: hidden;
}

</style>
<script setup lang="ts">
import EntryScene from "./scene/EntryScene.vue";
import BattleScene from "./scene/BattleScene.vue";
import { useGlobalEvent } from "./event/global_event";

const globalEventStore = useGlobalEvent();
</script>

<template>
  <div class="wrapper">
    <div
      class="scene"
      id="scene"
    >
      <EntryScene v-if="globalEventStore.currentScene === 'entry'" />
      <BattleScene v-if="globalEventStore.currentScene === 'battle'" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: rgb(38, 38, 38);
  display: flex;
  justify-content: center;
  align-items: center;
}

.scene {
  background-color: white;
  width: 100%;
  aspect-ratio: 2 / 1;
  position: absolute;
  overflow: hidden;
}
</style>

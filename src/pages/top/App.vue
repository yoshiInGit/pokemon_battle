<script setup lang="ts">
import EntryScene from "./scene/EntryScene.vue";
import BattleScene from "./scene/BattleScene.vue";
import { useGlobalEvent } from "./event/global_event";
import { ref } from "vue";
import { receiveMessage } from "@/service/message_listener";
import { useBattleEvent } from "./event/battle_event";
import { useEntryEvent } from "./event/entry_event";

const globalEventStore = useGlobalEvent();
const battleEventStore = useBattleEvent();
const entryEventStore = useEntryEvent();

const key = ref<number>(0);
const listenReset = () => {
  receiveMessage("reset-battle").then(() => {
    // location.reload();
    key.value++;
    entryEventStore.$reset();
    battleEventStore.$reset();
    globalEventStore.$reset();
    listenReset();
  });
};
listenReset();
</script>

<template>
  <div class="wrapper">
    <div
      class="scene"
      id="scene"
    >
      <EntryScene
        :key="`entry_${key}`"
        v-if="globalEventStore.currentScene === 'entry'"
      />
      <BattleScene
        :key="`battle_${key}`"
        v-if="globalEventStore.currentScene === 'battle'"
      />
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

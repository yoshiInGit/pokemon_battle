<script setup lang="ts">
import EntryScene from "./scene/EntryScene.vue";
import BattleScene from "./scene/BattleScene.vue";
import BgmIconAsset from "@/assets/img/entry/mute-icon.webp";
import { useGlobalEvent } from "./event/global_event";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { receiveMessage } from "@/service/message_listener";
import { useBattleEvent } from "./event/battle_event";
import { useEntryEvent } from "./event/entry_event";
import { sendScreen } from "@/service/screen_capture";

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

const containerElement = ref<HTMLElement>();
const intervalId = setInterval(() => {
  if (containerElement.value !== undefined) {
    sendScreen(containerElement.value);
  }
}, 0.5 * 1000);

const showBgmBtn = ref<boolean>(true);
const onClickBgmBtn = () => {
  showBgmBtn.value = false;
  entryEventStore.onStartTapped();
};

onMounted(() => {
  entryEventStore.onStartTapped();
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div
    class="wrapper"
    ref="containerElement"
  >
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
      <button
        v-if="showBgmBtn"
        class="bgmBtn"
        @click="onClickBgmBtn"
      >
        <img
          class="bgmBtnIcon"
          :src="BgmIconAsset"
        />
      </button>
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

.bgmBtn {
  position: absolute;
  top: 0;
  right: 1em;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 0.5em;
  padding: 0.5em;
}
.bgmBtn:hover {
  background-color: #aeaeae;
}

.bgmBtnIcon {
  width: 6em;
  height: auto;
}
</style>

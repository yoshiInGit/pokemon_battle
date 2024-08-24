<script setup lang="ts">
import { onMounted } from "vue";
import { useBattleEvent } from "../event/battle_event";
import { computed } from "vue";
import AttackMenu from "./module/AttackMenu.vue";
import Player1Inf from "./module/Player1Inf.vue";
import Player2Inf from "./module/Player2Inf.vue";
import MessageBox from "./module/MessageBox.vue";
import BattleBackgroundAsset from "@/assets/img/battle/background.png";
import LoseAsset from "@/assets/img/battle/lose.png";
import WinAsset from "@/assets/img/battle/win.png";
import { receiveMessage } from "@/service/message_listener";

const battleEventStore = useBattleEvent();

onMounted(() => {
  battleEventStore.startBattle();

  receiveMessage("attack").then((atkNum) => {
    battleEventStore.onAtkClicked(atkNum);
  });
});

const isShowAtcMenu = computed(() => battleEventStore.isShowAtcMenu);
// const isShowP1Cutin = computed(()=>battleEventStore.isShowCutin);

const p1CardImgUrl = computed(() => battleEventStore.p1CardImgUrl);
const p2CardImgUrl = computed(() => battleEventStore.p2CardImgUrl);

const cutinImg = computed(() => battleEventStore.cutinImg);

const isShowCutin = computed(() => battleEventStore.isShowCutin);

const showCutinVideo = computed(() => battleEventStore.showCutinVideo);

const p2AttackNames = computed(() => battleEventStore.p2AttackNames);
</script>

<template>
  <img
    :src="BattleBackgroundAsset"
    alt=""
    class="background"
  />

  <Player1Inf />

  <Player2Inf />

  <img
    :src="p1CardImgUrl"
    alt=""
    class="player1Card"
    id="player1Card"
  />
  <img
    :src="p2CardImgUrl"
    alt=""
    class="player2Card"
    id="player2Card"
  />

  <img
    :src="cutinImg"
    alt=""
    class="cutIn"
    id="cutIn"
    v-show="isShowCutin"
  />
  <video
    v-show="showCutinVideo"
    class="cutinVideo"
    id="cutin-video"
    :src="battleEventStore.p2CutinVideoSrc"
    muted
  ></video>

  <MessageBox />

  <div
    class="flash"
    v-show="false"
  ></div>

  <div
    class="veil"
    id="veil"
  ></div>

  <AttackMenu
    v-show="isShowAtcMenu"
    :attack-names="p2AttackNames"
  />

  <div
    class="winLoseWrapper"
    id="winLoseWrapper"
  >
    <img
      :src="WinAsset"
      id="win"
      class="win"
    />
    <img
      :src="LoseAsset"
      id="lose"
      class="lose"
    />
  </div>
</template>

<style scoped>
.background {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.player1Card {
  display: block;
  position: absolute;
  top: 32%;
  left: 12%;
  width: 20%;
  opacity: 0;
}

.player2Card {
  display: block;
  position: absolute;
  top: 32%;
  right: 12%;
  width: 20%;
  opacity: 0;
}
.veil {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(25, 25, 25);
  opacity: 1;
  display: block;
}

.cutIn {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(0 7%, 100% 23%, 100% 91%, 0 74%);
}

.cutinVideo {
  display: block;
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.flash {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: white;
  mix-blend-mode: hard-light;
  opacity: 0.7;
}

.winLoseWrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.656);
  opacity: 0;
}

.lose {
  opacity: 1;
  position: absolute;
  top: -100%;
  left: 30%;
  width: 48%;
}

.win {
  opacity: 1;
  position: absolute;
  top: -100%;
  left: 30%;
  width: 48%;
}
</style>

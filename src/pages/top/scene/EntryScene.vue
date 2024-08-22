<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useEntryEvent } from "../event/entry_event";
import WaitingBgWaveAsset from "@/assets/img/entry/wave.png";
// import PikaAsset from "@/assets/img/card/pika.png";

import { receiveMessage } from "@/service/message_listener";
import { StageAssets, type GymKeysType } from "@/domain/gym_pokemon";
import { getLocalStorageItem } from "@/service/localstorage_repository";
import { PlayerOptions } from "@/domain/player_pokemon";
import type { SupportKeys } from "@/domain/support_card";

const gymSelection = ref<GymKeysType>(getLocalStorageItem("gym-selection") ?? "01");

const store = useEntryEvent();

const checkGymSelection = () => {
  receiveMessage("gym-selection").then((payload) => {
    gymSelection.value = payload.key;
    checkGymSelection();
  });
};
checkGymSelection();

const listenPokemonSet = () => {
  receiveMessage("pokemon-set").then((key) => {
    store.setPlayerKey(key);
    listenPokemonSet();
  });
};

onMounted(() => {
  listenPokemonSet();

  receiveMessage("start-battle").then((battleInfo) => {
    const supportCards: Array<SupportKeys> = [];
    Object.keys(battleInfo.supportCards).forEach((key) => supportCards.push(key as SupportKeys));
    store.onBattle({
      gymLeaderKey: battleInfo.gymLeaderKey,
      playerKey: battleInfo.playerKey,
      supportCards: supportCards,
    });
  });
});
</script>

<template>
  <div class="background"></div>

  <img
    :src="WaitingBgWaveAsset"
    alt=""
    class="background-wave"
  />

  <Transition name="playerCard">
    <img
      v-if="store.playerKey !== null"
      :src="PlayerOptions[store.playerKey].src"
      alt=""
      class="pokemon"
      id="pokemon"
    />
  </Transition>

  <div
    class="gymLeaderWrapper"
    :class="{ playerSelected: store.playerKey !== null }"
  >
    <img
      :src="StageAssets[gymSelection].src"
      class="gymLeader"
    />
    <img
      v-if="store.playerKey === null"
      :src="StageAssets[gymSelection].status"
      class="gymLeaderInfo"
    />
  </div>

  <div
    class="veil"
    id="veil"
  ></div>
</template>

<style scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("@/assets/img/entry/background.png");
  background-position: 0% 0%;
  background-size: 200% 200%;
  background-repeat: repeat;
  animation-name: bg-animation;
  animation-duration: 180s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes bg-animation {
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: -1000% 1000%;
  }
}

.background-wave {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10%;
  margin: auto;
  width: 100%;
}

.pokemon {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  right: 10%;
  width: 20%;
}

.playerCard-enter-active,
.playerCard-leave-active {
  transition: all 1s;
}
.playerCard-enter-from,
.playerCard-leave-to {
  opacity: 0;
  transform: translate(10%, 0);
}
.playerCard-enter-to,
.playerCard-leave-from {
  opacity: 1;
  transform: translate(0, 0);
}

.gymLeaderWrapper {
  position: absolute;
  inset: 0;
  transition: all 1s;
}
.gymLeaderWrapper.playerSelected {
  transform: translate(-45%, 0);
}

.gymLeader {
  position: absolute;
  /* inset: 0; */
  top: 0;
  bottom: 0;
  right: 5%;
  height: 100%;
  margin: auto;
}

.gymLeaderInfo {
  position: absolute;
  margin: auto;
  bottom: 5%;
  left: 10%;
}

.veil {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(25, 25, 25);
  opacity: 0;
  display: none;
}

.control {
  width: 10px;
  height: 10px;
  background-color: white;
  position: fixed;
  top: 10px;
  left: 10px;
}
</style>

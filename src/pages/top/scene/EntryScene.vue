<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useEntryEvent } from "../event/entry_event";
import WaitingBgWaveAsset from "@/assets/img/entry/wave.png";
import PikaAsset from "@/assets/img/card/pika.png";
import ReshiramAsset from "@/assets/img/entry/01.png";
import ReshiramInfoAsset from "@/assets/img/entry/01-info.png";
import KapuKokekoAsset from "@/assets/img/entry/02.png";
import KapuKokekoInfoAsset from "@/assets/img/entry/02-info.png";
import DeoxysAsset from "@/assets/img/entry/03.png";
import DeoxysInfoAsset from "@/assets/img/entry/03-info.png";
import GabrielusAsset from "@/assets/img/entry/04.png";
import GabrielusInfoAsset from "@/assets/img/entry/04-info.png";
import GreninjakoAsset from "@/assets/img/entry/05.png";
import GreninjakoInfoAsset from "@/assets/img/entry/05-info.png";

import { receiveMessage } from "@/service/message_listener";

const StageAssets: Record<Gym, { gymReader: string; status: string }> = {
  "01": {
    gymReader: ReshiramAsset,
    status: ReshiramInfoAsset,
  },
  "02": {
    gymReader: KapuKokekoAsset,
    status: KapuKokekoInfoAsset,
  },
  "03": {
    gymReader: DeoxysAsset,
    status: DeoxysInfoAsset,
  },
  "04": {
    gymReader: GabrielusAsset,
    status: GabrielusInfoAsset,
  },
  "05": {
    gymReader: GreninjakoAsset,
    status: GreninjakoInfoAsset,
  },
};

type Gym = "01" | "02" | "03" | "04" | "05";

const gymSelection = ref<Gym>("05");

const { onPokemonSet, onBattle } = useEntryEvent();

onMounted(() => {
  receiveMessage("pokemon-set").then((payload) => {
    onPokemonSet(payload);
  });

  receiveMessage("start-battle").then(() => {
    onBattle();
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

  <img
    :src="PikaAsset"
    alt=""
    class="pokemon"
    id="pokemon"
  />

  <img
    :src="StageAssets[gymSelection].gymReader"
    class="gymReader"
  />
  <img
    :src="StageAssets[gymSelection].status"
    class="gymReaderInfo"
  />

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
  position: fixed;
  top: 37%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20%;
  opacity: 0;
  display: none;
}

.gymReader {
  position: absolute;
  /* inset: 0; */
  top: 0;
  bottom: 0;
  right: 5%;
  height: 100%;
  margin: auto;
}

.gymReaderInfo {
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

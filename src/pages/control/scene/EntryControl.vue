<script setup lang="ts">
import { useGlobalEvent } from "@/pages/control/event/control_event";
import Player01CardAsset from "@/assets/img/card/player-01.png";
import Player02CardAsset from "@/assets/img/card/player-02.png";
import Player03CardAsset from "@/assets/img/card/player-03.png";
import Player04CardAsset from "@/assets/img/card/player-04.png";
import Player05CardAsset from "@/assets/img/card/player-05.png";
import Player06CardAsset from "@/assets/img/card/player-06.png";
import Player07CardAsset from "@/assets/img/card/player-07.png";
import Player08CardAsset from "@/assets/img/card/player-08.png";

import { postMessage } from "@/service/message_listener";

const { changeScene } = useGlobalEvent();

const setPokemon = () => {
  postMessage("pokemon-set", "");
};

const startBattle = () => {
  postMessage("start-battle", "");
};

const PlayerOptions = [
  {
    src: Player01CardAsset,
    name: "ミロカロス",
  },
  {
    src: Player02CardAsset,
    name: "シャリタツ",
  },
  {
    src: Player03CardAsset,
    name: "マニューラ",
  },
  {
    src: Player04CardAsset,
    name: "オノノクス",
  },
  {
    src: Player05CardAsset,
    name: "ルガルガン",
  },
  {
    src: Player06CardAsset,
    name: "イワーク",
  },
  {
    src: Player07CardAsset,
    name: "リーフィア",
  },
  {
    src: Player08CardAsset,
    name: "デデンネ",
  },
];
</script>

<template>
  <div class="wrapper">
    <div class="card-selector">
      <div
        class="card-wrapper"
        @click="setPokemon"
        v-for="card of PlayerOptions"
        :key="`player_card_options_${card.name}`"
      >
        <img
          class="card"
          :src="card.src"
        />
        <div
          class="card-name"
          v-text="card.name"
        ></div>
      </div>
    </div>
    <div class="controller">
      <select class="enemy-selector">
        <option>敵ポケモン１</option>
        <option>敵ポケモン２</option>
        <option>敵ポケモン３</option>
      </select>

      <div
        class="battle-btn"
        @click="startBattle"
      >
        バトル開始
      </div>

      <div
        class="change-ctr-btn"
        @click="changeScene('battle-control')"
      >
        バトル操作画面
      </div>
    </div>
  </div>
</template>

<style>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
}

.card-selector {
  padding: 2em 3em;
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
  width: 80%;
  box-sizing: border-box;

  display: flex;
  justify-content: start;
  align-items: start;
  gap: 14px;
  flex-wrap: wrap;
}

.controller {
  height: 100%;
  width: 20%;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  gap: 40px;
}

.card-wrapper {
  width: 15%;
  aspect-ratio: 31/37;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 14px 28px;
  border-radius: 16px;
}

.card-wrapper:hover {
  background-color: #c9c9c9;
}

.card {
  display: block;
  width: 100%;
  cursor: pointer;
}

.card-name {
  font-family: "Noto Sans JP", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.enemy-selector {
  width: 80%;
  font-size: 20px;
}

.battle-btn {
  width: 80%;
  height: 60px;
  background-color: #ff109f;
  color: white;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  letter-spacing: -1px;
  cursor: pointer;
  box-shadow: 2px 2px 4px -2px gray inset;
}

.change-ctr-btn {
  width: 80%;
  height: 60px;
  background-color: #103b91;
  color: white;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  letter-spacing: -1px;
  cursor: pointer;
  box-shadow: 2px 2px 4px -2px gray inset;
}
</style>

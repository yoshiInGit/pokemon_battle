<script setup lang="ts">
import { postMessage, receiveMessage } from "@/service/message_listener";
import { StageAssets } from "@/domain/gym_pokemon";
import { useGymSelection } from "../service/gym_selection";
import { PlayerOptions, type PlayerKeys } from "@/domain/player_pokemon";
import { ref } from "vue";
import AttackSelectionModal from "@/pages/control/scene/module/AttackSelectionModal.vue";
import { supportCards, type SupportKeys } from "@/domain/support_card";

const { selection: gymSelection, setSelection: setGymSelection } = useGymSelection();

const playerSelection = ref<PlayerKeys | null>(null);
const setPokemon = async (key: PlayerKeys) => {
  await postMessage("pokemon-set", key);
  playerSelection.value = key;
};

const startBattle = () => {
  const selectedSupportKeysObj: Record<SupportKeys, boolean> = {
    "01": false,
  };
  selectedSupportKeys.value.forEach((key) => (selectedSupportKeysObj[key] = true));

  postMessage("start-battle", {
    gymLeaderKey: gymSelection.value,
    playerKey: playerSelection?.value ?? "01",
    supportCards: selectedSupportKeysObj,
  });
};

const resetBattle = async () => {
  await postMessage("reset-battle", {});
  playerSelection.value = null;
};

const showAttackSelection = ref<boolean>(false);
const attackSelections = ref<[string, string, string]>(["", "", ""]);
const onSelect = (index: 0 | 1 | 2) => {
  postMessage("attack", index);
  showAttackSelection.value = false;
};

const onClose = () => {
  showAttackSelection.value = false;
};

const listenPokemonSet = () => {
  receiveMessage("show-attack-selections").then((attacks) => {
    showAttackSelection.value = true;
    attackSelections.value = [attacks[0], attacks[1], attacks[2]];
    listenPokemonSet();
  });
};
listenPokemonSet();

const selectedSupportKeys = ref<Array<SupportKeys>>([]);
</script>

<template>
  <div class="wrapper">
    <div class="leftPanel">
      <label
        class="playerCardLabel"
        v-for="(card, key) in PlayerOptions"
        :key="`player_card_options_${card.name}`"
      >
        <input
          type="radio"
          name="player_selection"
          class="playerCardLabelInput"
          @change="setPokemon(key)"
          :checked="playerSelection === key"
        />
        <img
          class="card"
          :src="card.src"
        />
        <div
          class="card-name"
          v-text="card.name"
        ></div>
      </label>

      <div class="supportCards">
        <label
          v-for="(card, key) in supportCards"
          :key="`support_card_selection_${key}`"
          class="supportCardLabel"
        >
          <input
            class="supportCardInput"
            type="checkbox"
            name="support_cards"
            :value="key"
            v-model="selectedSupportKeys"
          />
          <div class="supportHeader">
            <span class="supportCardCheckbox"></span>
            <div
              class="supportCardText"
              v-text="card.name"
            ></div>
          </div>
          <img
            class="supportCardImg"
            :src="card.cardSrc"
          />
        </label>
      </div>

      <div
        class="controllers"
        :class="{ show: playerSelection !== null && gymSelection !== null }"
      >
        <div class="battleInfo">
          <div
            v-if="playerSelection !== null"
            class="playerInfo"
          >
            <span v-text="PlayerOptions[playerSelection].name"></span>
          </div>
          <div>VS</div>
          <div class="gymNames">
            <span v-text="`${StageAssets[gymSelection].leaderName}&${StageAssets[gymSelection].pokemonName}`"></span
            ><br />
            <span v-text="`${StageAssets[gymSelection].location}`"></span>
          </div>
        </div>
        <div class="actions">
          <button
            class="battle-btn"
            @click="startBattle"
          >
            バトル開始
          </button>
          <button
            class="resetBtn"
            @click="resetBattle"
          >
            リセット
          </button>
        </div>
      </div>
    </div>
    <div class="rightPanel">
      <label
        v-for="(gym, key) in StageAssets"
        :key="`gym_pokemons_${gym.location}`"
        class="gymReaderLabel"
      >
        <input
          class="gymReaderInput"
          type="radio"
          @change="setGymSelection(key)"
          :value="key"
          :checked="gymSelection === key"
          name="gym_selection"
        />
        <div class="gymReaderWrapper">
          <div class="gymReaderImgWrapper">
            <img
              class="gymReaderImg"
              :src="gym.src"
            />
          </div>
          <div class="locationWrapper">
            <div
              class="locationText"
              v-text="gym.location"
            ></div>
          </div>
        </div>
      </label>
    </div>
    <AttackSelectionModal
      v-if="showAttackSelection"
      :attacks="attackSelections"
      @select="onSelect"
      @close="onClose"
    />
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

.leftPanel {
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

.rightPanel {
  width: 30%;
  overflow-y: scroll;
  padding: 1em;
  padding-bottom: 20em;
}

.playerCardLabel {
  width: 15%;
  aspect-ratio: 31/37;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 14px 28px;
  border-radius: 16px;
}

.playerCardLabel:hover,
.playerCardLabel:has([type="radio"]:checked) {
  background-color: #c9c9c9;
}

.playerCardLabelInput {
  display: none;
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

.supportCards {
  width: 100%;
  border: solid 4px gray;
  display: flex;
  justify-content: start;
  padding: 1.5em 1em;
}

.supportCardLabel {
  padding: 0.5em;
  border-radius: 1em;
  cursor: pointer;
  border: solid 3px white;
  background-color: gray;
}
.supportCardLabel:hover {
  border-color: gray;
}

.supportCardInput {
  display: none;
}

.supportCardImg {
  width: 10em;
  height: 10em;
  object-fit: cover;
  object-position: center top;
}

.supportHeader {
  display: flex;
  align-items: center;
  gap: 0.2em;
}

.supportCardCheckbox {
  position: relative;
  display: block;
  background-color: white;
  border-radius: 0.2em;
  width: 1em;
  height: 1em;
}

.supportCardCheckbox::after {
  content: "";
  position: absolute;
  display: block;
  inset: 0;
  margin: auto;
  border: solid white 3px;
  border-width: 0 0 3px 3px;
  width: 50%;
  height: 40%;
  rotate: -45deg;
  box-sizing: border-box;
}

.supportCardLabel:has([type="checkbox"]:checked) {
  border-color: #107cff;
}
.supportCardLabel:has([type="checkbox"]:checked) .supportCardCheckbox {
  background-color: #107cff;
}

.supportCardText {
  color: white;
}

.controllers {
  position: fixed;
  right: 0;
  background-color: white;
  width: 30em;
  height: 9em;
  padding: 1em;
  box-sizing: border-box;
  border-radius: 2em 2em 0 0;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.2));
  transition: all 0.5s;
  bottom: -9em;
}
.controllers.show {
  bottom: 0;
}

.battleInfo {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  gap: 0.2em;
  margin-bottom: 1em;
}

.gymNames {
  padding: 0.3em 0.3em;
  background-color: gray;
  border-radius: 0.3em;
  color: white;
}

.playerInfo {
  padding: 0.3em 0.3em;
  background-color: gray;
  border-radius: 0.3em;
  color: white;
}

.actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.enemy-selector {
  width: 80%;
  font-size: 20px;
}

.battle-btn {
  height: 60px;
  background-color: #ff109f;
  color: white;
  font-size: 2rem;
  border-radius: 5px;
  cursor: pointer;
}

.resetBtn {
  height: 60px;
  columns: white;
  font-size: 2rem;
  border-radius: 5px;
  cursor: pointer;
}

.battle-btn:hover,
.resetBtn:hover {
  filter: drop-shadow(0px 0px 7px rgb(0, 0, 0));
}

.change-ctr-btn {
  /* width: 80%; */
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

.gymReaderLabel {
  display: inline-block;
  border-radius: 3em;
  cursor: pointer;
  padding: 1em;
  cursor: pointer;
}

.gymReaderLabel:hover,
.gymReaderLabel:has([type="radio"]:checked) {
  background-color: #c9c9c9;
}

.gymReaderWrapper {
  background-color: white;
  border: solid gray 0.5em;
  border-radius: 2em;
  width: 17em;
}

.gymReaderInput {
  display: none;
}

.gymReaderImgWrapper {
  width: 100%;
  height: 7em;
}

.gymReaderImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
}

.locationWrapper {
  background-color: gray;
  padding: 0.5em 0 0;
}

.locationText {
  width: 50%;
  background-color: white;
  padding: 0.3em 1em;
  border-radius: 0 1.5em 0 1.5em;
  font-weight: bold;
}
</style>

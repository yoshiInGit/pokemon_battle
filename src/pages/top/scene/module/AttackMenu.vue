<script setup lang="ts">
import type { PropType } from "vue";
import AttackFrameAssets from "@/assets/img/battle/attack-frame.png";
import { useGlobalEvent } from "../../event/global_event";
const globalEventStore = useGlobalEvent();

defineProps({
  attackNames: {
    type: Array as PropType<Array<string>>,
    required: true,
  },
});
</script>

<template>
  <div
    class="atkMenu"
    id="atkMenu"
  >
    <div
      class="atkMenu-list"
      id="atkMenu_list"
    >
      <img
        class="attackFrameImg"
        :src="AttackFrameAssets"
        alt=""
      />
      <span
        class="attackNameText"
        v-text="attackNames[0]"
      ></span>
      <span class="attackPercentageStroke">20%</span>
      <span class="attackPercentage">20%</span>

      <div class="attackAbility">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div
      class="atkMenu-list"
      id="atkMenu_list"
    >
      <img
        class="attackFrameImg"
        :src="AttackFrameAssets"
        alt=""
      />
      <span
        class="attackNameText"
        v-text="attackNames[1]"
      ></span>
      <span class="attackPercentageStroke">50%</span>
      <span class="attackPercentage">50%</span>

      <div class="attackAbility">
        <span></span>
        <span></span>
        <span :style="{ opacity: globalEventStore.useSupportBoostEnergy ? 1 : 0 }"></span>
      </div>
    </div>
    <div
      class="atkMenu-list"
      id="atkMenu_list"
    >
      <img
        class="attackFrameImg"
        :src="AttackFrameAssets"
        alt=""
      />
      <span
        class="attackNameText"
        v-text="attackNames[2]"
      ></span>
      <span class="attackPercentageStroke">90%</span>
      <span class="attackPercentage">90%</span>

      <div class="attackAbility">
        <span></span>
        <span :style="{ opacity: globalEventStore.useSupportBoostEnergy ? 1 : 0 }"></span>
        <span :style="{ opacity: globalEventStore.useSupportBoostEnergy ? 1 : 0 }"></span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.atkMenu {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.655);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5%;
}

.atkMenu-list {
  position: relative;
  width: 15em;
  height: 3em;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 270%;
  font-weight: bolder;
}

.attackFrameImg {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.attackNameText {
  display: block;
  position: absolute;
  line-height: 1;
  height: 1em;
  top: 0;
  bottom: 0;
  left: 0.8em;
  margin: auto;
}

.attackPercentage,
.attackPercentageStroke {
  position: absolute;
  top: 0.8em;
  right: 3em;
  font-size: 0.6em;
  filter: drop-shadow(0 0 2px black);
  color: white;
}
.attackPercentageStroke {
  font-weight: bold;
  color: black;
}

.attackAbility {
  position: absolute;
  right: 2em;
  bottom: 0.875em;
  display: flex;
  gap: 3px;
  justify-self: flex-start;
}

.attackAbility span {
  background-color: orange;
  display: block;
  height: 0.3em;
  width: 0.75em;
}

.attackAbility span:nth-of-type(3) {
  border-radius: 0 100vh 100vh 0;
}
</style>

<script setup lang="ts">
import type { PropType } from "vue";

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
      v-text="attackNames[0]"
    ></div>
    <div
      class="atkMenu-list"
      id="atkMenu_list"
      v-text="attackNames[1]"
    ></div>
    <div
      class="atkMenu-list"
      id="atkMenu_list"
      v-text="attackNames[2]"
    ></div>
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
  width: 60%;
  height: 15%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 270%;
  font-weight: bolder;

  clip-path: polygon(10% 0, 100% 0, 90% 100%, 0% 100%);

  background-color: white;

  cursor: pointer;
}
</style>

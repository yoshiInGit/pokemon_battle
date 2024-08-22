<script setup lang="ts">
import { onMounted, ref, watch, type PropType } from "vue";

const props = defineProps({
  base64: {
    type: String as PropType<string>,
    required: true,
  },
});

const captureSource = ref<string>("");

const hideBtn = ref<boolean>(true);
const onClickHideBtn = () => {
  hideBtn.value = !hideBtn.value;
};

const draw = () => {
  captureSource.value = `${props.base64}`;
};

onMounted(() => {
  draw();
});

watch(
  () => props.base64,
  () => {
    draw();
  },
  { immediate: true },
);
</script>

<template>
  <div
    class="captureContainer"
    :class="{ hide: hideBtn }"
    @click="onClickHideBtn"
  >
    <img
      :src="captureSource"
      alt=""
      style="width: 300px; height: 150px; object-fit: contain"
    />
    <button class="hideBtn">
      <span class="arrow"></span>
    </button>
    <div class="overlay"></div>
  </div>
</template>

<style scoped>
.captureContainer {
  position: fixed;
  right: 0;
  top: 0;
  width: 300px;
  height: 150px;
  transition: all 0.5s;
}

.captureContainer.hide {
  transform: translate(50%, -50%);
}

.captureContainer:hover .hideBtn {
  display: block;
  background-color: #00000070;
}

.overlay {
  position: absolute;
  inset: 0;
  cursor: pointer;
}
.overlay:hover {
  background-color: #00000070;
}

.hideBtn {
  display: none;
  position: absolute;
  inset: 0;
  margin: auto;
  padding: 0.8em;
  width: 60px;
  height: 60px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  border-radius: 0.5em;
}

.arrow {
  position: relative;
  display: block;
  background-color: transparent;
  border: solid 8px white;
  border-bottom-width: 0;
  border-left-width: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.arrow::before {
  position: absolute;
  content: "";
  display: block;
  border: solid 4px white;
  width: 100%;
  height: 0;
  inset: 0;
  margin: auto;
  rotate: -45deg;
  transform: translate(0, -3px);
}
</style>

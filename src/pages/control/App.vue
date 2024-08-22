<script setup lang="ts">
import EntryControl from "@/pages/control/scene/EntryControl.vue";
import { receiveScreen } from "@/service/screen_capture";
import { ref } from "vue";
import DisplayCapture from "./scene/module/DisplayCapture.vue";

const listenScreenCapture = async () => {
  receiveScreen().then((base64) => {
    captureBase64.value = base64;
    listenScreenCapture();
  });
};
listenScreenCapture();

const captureBase64 = ref<string>("");
</script>

<template>
  <div class="wrapper">
    <div
      class="scene"
      id="scene"
    >
      <EntryControl />
    </div>
    <DisplayCapture :base64="captureBase64" />
  </div>
</template>

<style scoped></style>

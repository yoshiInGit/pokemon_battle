<script setup lang="ts">
import type { AttackOptionsType } from "@/domain/attack";
import { postMessage } from "@/service/message_listener";

const attack = (atkNum: AttackOptionsType) => {
  postMessage("attack", atkNum);
};
</script>

<template>
  <div @click="attack(0)">ATK1</div>
  <div @click="attack(1)">ATK2</div>
  <div @click="attack(2)">ATK3</div>
</template>

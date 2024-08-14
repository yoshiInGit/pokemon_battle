<script setup lang="ts">
const channel = new BroadcastChannel("pokemon-battle");

const attack = (atkNum: "0" | "1" | "2") => {
    channel.postMessage({
        order: "attack",
        payload: atkNum,
    });
};
</script>

<template>
    <div
        @click="
            () => {
                attack('0');
            }
        "
    >
        ATK1
    </div>
    <div
        @click="
            () => {
                attack('1');
            }
        "
    >
        ATK2
    </div>
    <div
        @click="
            () => {
                attack('2');
            }
        "
    >
        ATK3
    </div>
</template>

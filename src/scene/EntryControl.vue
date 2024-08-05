<script setup lang="ts">
import { useGlobalEvent } from "../event/global_event";

const {changeScene} = useGlobalEvent();

const channel = new BroadcastChannel("pokemon-battle");

const setPokemon = () => {
    channel.postMessage({
        order   : "pokemon-set",
        payload : ""
    });
}

const startBattle = () => {
    channel.postMessage({
        order   : "start-battle",
        payload : ""
    });
}
</script>

<template>
    <div class="" @click="setPokemon">PokemonSet</div>
    <div class="" @click="startBattle">Battle!</div>
    <div class="" @click="changeScene('battle-control')">Battle control</div>
</template>
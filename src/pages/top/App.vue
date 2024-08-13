<script setup lang="ts">
import EntryScene from "./scene/EntryScene.vue";
import BattleScene from "./scene/BattleScene.vue";
import EntryControl from "./scene/EntryControl.vue";
import BattleControl from "./scene/BattleControl.vue";
import { useGlobalEvent } from "./event/global_event";
import { computed } from "vue";

const globalEventStore = useGlobalEvent();
const currentScene = computed(() => globalEventStore.currentScene);
</script>

<template>
    <div class="wrapper">
        <div class="scene" id="scene">
            <EntryScene v-if="currentScene === 'entry'" />
            <EntryControl v-if="currentScene === 'entryControl'" />
            <BattleScene v-if="currentScene === 'battle'" />
            <BattleControl v-if="currentScene === 'battle-control'"></BattleControl>
        </div>
    </div>
</template>

<style scoped>
.wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: rgb(38, 38, 38);
    display: flex;
    justify-content: center;
    align-items: center;
}

.scene {
    background-color: white;
    width: 100%;
    aspect-ratio: 2 / 1;
    position: absolute;
    overflow: hidden;
}
</style>

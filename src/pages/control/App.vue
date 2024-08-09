<script setup lang="ts">
import { useGlobalEvent } from "@/pages/control/event/control_event";
import BattleControl from "@/pages/control/scene/BattleControl.vue";
import EntryControl from "@/pages/control/scene/EntryControl.vue";
const { currentScene } = useGlobalEvent();
</script>

<template>
    <div class="wrapper">
        <div class="scene" id="scene">
            <EntryControl v-if="currentScene === 'entry-control'" />
            <BattleControl v-if="currentScene === 'battle-control'" />
        </div>
    </div>
</template>

<style scoped></style>

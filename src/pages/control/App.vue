<script setup lang="ts">
import { useGlobalEvent } from "@/pages/control/event/control_event";
import BattleControl from "@/pages/control/scene/BattleControl.vue";
import EntryControl from "@/pages/control/scene/EntryControl.vue";
const store = useGlobalEvent();
</script>

<template>
    <div class="wrapper">
        <div class="scene" id="scene">
            <EntryControl v-if="store.currentScene === 'entry-control'" />
            <BattleControl v-else-if="store.currentScene === 'battle-control'" />
        </div>
    </div>
</template>

<style scoped></style>

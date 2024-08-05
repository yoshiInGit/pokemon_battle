<script  setup>
import {computed, ref} from 'vue'
import {useBattleEvent} from '../../event/battle_event'

const battleEventStore = useBattleEvent();

const message = computed(()=> battleEventStore.messageText);

</script>

<template>
<div class="message-box" id="messageBox">
    <div class="message">
        {{message}}
    </div>
</div>
</template>

<style scoped>

.message-box{
position  : absolute;
bottom    : 5%;
left      : 50%;
transform : translate(-50%,0);

width  : 0%;
height : 30%;
background-color: rgba(0, 0, 0, 0.751);
color  :white;

display: flex;
justify-content: center;
align-items: center;

font-family : "Noto Sans JP", sans-serif;
font-optical-sizing: auto;
font-style  : normal;
}

.message{
    width: 95%;
    height: 93%;
    white-space: pre-wrap;
    font-size: 200%;
}
</style>
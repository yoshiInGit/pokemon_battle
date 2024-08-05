<script setup lang="ts">
import {computed, ref} from 'vue'
import {useBattleEvent} from '../../event/battle_event'

const battleEventStore = useBattleEvent();

const p1Name   = computed(()=>battleEventStore.p1Name);
const p1Hp     = computed(()=>battleEventStore.p1HpStr);
const p1HpRate = computed(()=>battleEventStore.p1HpRate);

</script>

<template>
    <div class="player1Inf">
      <div class="player1Inf-hpIndicatorBase">
        <div class="player1Inf-hpIndicator" id="player1Inf_hpIndicator" :style="`width: ${p1HpRate*100}%;`"></div>
      </div>
      <div class="player1Inf-hp" id="player1Inf_hp">{{ p1Hp }}</div>
      <div class="player1Inf-name" id="player1Inf_name">{{ p1Name }}</div>
    </div>
</template>
    

<style scoped>
.player1Inf{
    background-color: white;
    position: absolute;
    top: 10%;
    left: 0;
    width: 30%;
    height: 12%;
    clip-path: polygon(0 0, 85% 0, 100% 100%, 0% 100%);
    box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, 0.4);

    font-family : "Noto Sans JP", sans-serif;
    font-optical-sizing: auto;
    font-style  : normal;
}

.player1Inf-hpIndicatorBase{
    width: 85%;
    height: 15%;
    background-color: rgb(205, 205, 205);
    position: absolute;
    top: 65%;
    left: 3%;
}

.player1Inf-hpIndicator{
    position: absolute;
    width: 0%;
    height: 100%;
    background-color: #79DF55;
    top: 0;
    right: 0;
}

.player1Inf-name{
    position: absolute;
    top: 31%;
    right: 15%;
    font-size: 90%;
    font-weight: bold;
}

.player1Inf-hp{
    position: absolute;
    top: 31%;
    left: 4%;
    font-size: 90%;
    font-weight: bold;   
}

</style>
<script setup lang="ts">
import {computed, ref} from 'vue'
import {useBattleEvent} from '../../event/battle_event'

const battleEventStore = useBattleEvent();

const p2Name = computed(()=>battleEventStore.p2Name);
const p2Hp   = computed(()=>battleEventStore.p2HpStr);
const p2HpRate   = computed(()=>battleEventStore.p2HpRate);

</script>

<template>
    <div class="player2Inf">
      <div class="player2Inf-hpIndicatorBase">
        <div class="player2Inf-hpIndicator" id="player2Inf_hpIndicator" :style="`width: ${p2HpRate*100}%;`"></div>
      </div>
      <div class="player2Inf-hp" id="player2Inf_hp">{{ p2Hp }}</div>
      <div class="player2Inf-name" id="player2Inf_name">{{ p2Name }}</div>
    </div>
</template>
    

<style scoped>
.player2Inf{
    background-color: white;
    position: absolute;
    top: 10%;
    right: 0;
    width: 30%;
    height: 12%;
    clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
    box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, 0.4);
    
    font-family : "Noto Sans JP", sans-serif;
    font-optical-sizing: auto;
    font-style  : normal;
}

.player2Inf-hpIndicatorBase{
    width: 85%;
    height: 15%;
    background-color: rgb(205, 205, 205);
    position: absolute;
    top: 65%;
    right: 3%;
}

.player2Inf-hpIndicator{
    position: absolute;
    width: 0%;
    height: 100%;
    background-color: #79DF55;
    top: 0;
    left: 0;
}

.player2Inf-name{
    position: absolute;
    top: 31%;
    left: 12%;
    font-size: 90%;
    font-weight: bold;
}

.player2Inf-hp{
    position: absolute;
    top: 31%;
    right: 4%;
    font-size: 90%;
    font-weight: bold;   
}

</style>
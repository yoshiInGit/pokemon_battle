<script setup lang="ts">
import {onMounted} from 'vue';
import {useBattleEvent} from '../event/battle_event'
import {computed, ref} from 'vue'
import AttackMenu from './module/AttackMenu.vue'
import Player1Inf from './module/Player1Inf.vue'
import Player2Inf from './module/Player2Inf.vue'
import MessageBox from './module/MessageBox.vue'
import { mapState } from 'pinia';
import BattleBackgroundAsset from "@/assets/img/battle/background.png"
import CutinAsset from "@/assets/img/cutin/cutin.png"
import LoseAsset from "@/assets/img/battle/lose.png"

const battleEventStore = useBattleEvent();

onMounted(()=>{
    battleEventStore.startBattle();

    const channel = new BroadcastChannel("pokemon-battle");
    channel.addEventListener("message", (event)=>{
        const msg = event.data;

        if(msg.order == "attack"){
            battleEventStore.onAtkClicked(msg.payload);
        }
    });
});

const isShowAtcMenu = computed(()=>battleEventStore.isShowAtcMenu);
const isShowP1Cutin = computed(()=>battleEventStore.isShowCutin);

const p1CardImgUrl = computed(()=>battleEventStore.p1CardImgUrl);
const p2CardImgUrl = computed(()=>battleEventStore.p2CardImgUrl);

const isShowCutin = computed(()=>battleEventStore.isShowCutin);

</script>

<template>
    <img :src="BattleBackgroundAsset" alt="" class="background">

    <Player1Inf/>

    <Player2Inf/>

    <img :src="p1CardImgUrl"  alt="" class="player1Card" id="player1Card">
    <img :src="p2CardImgUrl" alt="" class="player2Card"  id="player2Card">

    <img :src="CutinAsset" alt="" class="cutIn" id="cutIn" v-show="isShowCutin">

    <MessageBox/>

    <div class="flash" v-show="false"></div>

    <div class="veil" id="veil"></div>
    
    <AttackMenu v-show="isShowAtcMenu"/>
    
    <div class="winLoseWrapper" id="winLoseWrapper">
        <!-- <img src="./assets/imgs/basic/WIN!.png" alt="" class="win"> -->
        <img :src="LoseAsset" id="lose" class="lose">
    </div>
</template>

<style scoped>
.background{
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

.player1Card{
    display: block;
    position: absolute;
    top: 35%;
    left: 12%;
    width: 24%;
    opacity: 0;
}

.player2Card{
    display: block;
    position: absolute;
    top:35%;
    right : 12%;
    width : 24%;
    opacity: 0;
}
.veil{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(25, 25, 25);
    opacity: 1;
    display:  block;
  }

.cutIn{
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip-path: polygon(0 7%, 100% 23%, 100% 91%, 0 74%);
}

.flash{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: white;
    mix-blend-mode: hard-light;
    opacity: 0.7;
}

.winLoseWrapper{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0);
    opacity: 0;
}

.lose{
    position: absolute;
    top: -100%;
    left: 30%;
    width: 48%;
}
</style>
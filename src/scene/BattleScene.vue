<script setup>
import {onMounted} from 'vue';
import {useBattleEvent} from '../event/battle_event'
import {computed, ref} from 'vue'
import AttackMenu from './module/AttackMenu.vue'


const battleEventStore = useBattleEvent();

onMounted(()=>{
  battleEventStore.startBattle();
});

const isShowAtcMenu = computed(()=>battleEventStore.isShowAtcMenu);
const isShowP1Cutin = computed(()=>battleEventStore.isShowP1Cutin);


const p1CardImgUrl = computed(()=>battleEventStore.p1CardImgUrl);
const p2CardImgUrl = computed(()=>battleEventStore.p2CardImgUrl);

const p1Name = computed(()=>battleEventStore.p1Name);
const p2Name = computed(()=>battleEventStore.p2Name);

const p1Hp   = computed(()=>battleEventStore.p1HpStr);
const p2Hp   = computed(()=>battleEventStore.p2HpStr);

const p1HpRate   = computed(()=>battleEventStore.p1HpRate);
const p2HpRate   = computed(()=>battleEventStore.p2HpRate);


</script>

<template>
    <img src="/img/battle/background.png" alt="" class="background">

    <div class="player1Inf">
      <div class="player1Inf-hpIndicatorBase">
        <div class="player1Inf-hpIndicator" id="player1Inf_hpIndicator" :style="`width: ${p1HpRate*100}%;`"></div>
      </div>
      <div class="player1Inf-hp" id="player1Inf_hp">{{ p1Hp }}</div>
      <div class="player1Inf-name" id="player1Inf_name">{{ p1Name }}</div>
    </div>


    <div class="player2Inf">
      <div class="player2Inf-hpIndicatorBase">
        <div class="player2Inf-hpIndicator" id="player2Inf_hpIndicator" :style="`width: ${p2HpRate*100}%;`"></div>
      </div>
      <div class="player2Inf-hp" id="player2Inf_hp">{{ p2Hp }}</div>
      <div class="player2Inf-name" id="player2Inf_name">{{ p2Name }}</div>
    </div>


    <img :src="p1CardImgUrl"  alt="" class="player1Card" id="player1Card">
    <img :src="p2CardImgUrl" alt="" class="player2Card"  id="player2Card">

    <img src="/img/cutin/cutin.png" alt="" class="p1cutIn" id="p1cutIn" v-show="isShowP1Cutin">

    <div class="flash" v-show="false"></div>

    <div class="veil" id="veil"></div>

    <AttackMenu v-show="isShowAtcMenu"/>
    
        <!-- 
    
    <img src="./assets/imgs/basic/WIN!.png" alt="" class="win">
    <img src="./assets/imgs/basic/lose.png" alt="" class="lose"> -->
</template>

<style scoped>
.background{
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
}

.player1Inf{
    background-color: white;
    position: absolute;
    top: 10%;
    left: 0;
    width: 30%;
    height: 12%;
    clip-path: polygon(0 0, 85% 0, 100% 100%, 0% 100%);
    box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, 0.4);
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


.player2Inf{
    background-color: white;
    position: absolute;
    top: 10%;
    right: 0;
    width: 30%;
    height: 12%;
    clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
    box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, 0.4);
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

.p1cutIn{
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
</style>
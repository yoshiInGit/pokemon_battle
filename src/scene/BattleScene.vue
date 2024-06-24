<script setup>
import {onMounted} from 'vue';
import {useBattleEvent} from '../event/battle_event'

const {startBattle} = useBattleEvent();

onMounted(()=>{
  startBattle();
});

</script>

<template>
    <img src="/img/battle/background.png" alt="" class="background">

    <div class="player1Inf">
      <div class="player1Inf-hpIndicatorBase">
        <div class="player1Inf-hpIndicator" id="player1Inf_hpIndicator"></div>
      </div>
      <div class="player1Inf-hp" id="player1Inf_hp">--/--</div>
      <div class="player1Inf-name" id="player1Inf_name">---</div>
    </div>


    <div class="player2Inf">
      <div class="player2Inf-hpIndicatorBase">
        <div class="player2Inf-hpIndicator" id="player2Inf_hpIndicator"></div>
      </div>
      <div class="player2Inf-hp" id="player2Inf_hp">--/--</div>
      <div class="player2Inf-name" id="player2Inf_name">---</div>
    </div>


    <img src="/img/card/card.png"  alt="" class="player1Card" id="player1Card">
    <img src="/img/card/card.png" alt="" class="player2Card"  id="player2Card">

    <div class="veil" id="veil"></div>

    
        <!-- 

    <div class="atkMenu" id="atkMenu">
      <div class="atkMenu-list" id="atkMenu_list">10万ボルト</div>
      <div class="atkMenu-list" id="atkMenu_list">10万ボルト</div>
      <div class="atkMenu-list" id="atkMenu_list">10万ボルト</div>
    </div>
    
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
</style>
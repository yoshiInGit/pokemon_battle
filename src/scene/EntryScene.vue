<script setup lang="ts">
import anime from "animejs";
import {onMounted} from 'vue';
import {useEntryEvent} from '../event/entry_event'
import { useGlobalEvent } from "../event/global_event";

const {onStartTapped, onPokemonSet, onBattle} = useEntryEvent(); 

const {changeScene} = useGlobalEvent();

onMounted(()=>{
    const channel = new BroadcastChannel("pokemon-battle");
    channel.addEventListener("message",(event)=>{
        const msg = event.data;
        console.log(msg)
        
        if(msg.order=="pokemon-set"){
            onPokemonSet(msg.payload);
            return;
        }

        if(msg.order=="start-battle"){
            onBattle();
            return;
        }

    })
});

</script>

<template>
    <img src='/img/entry/waiting_bg.jpg' alt="" class="background">
        
    <div class="ball-wrapper">
        <img src="/img/entry/pokemon_ball.png" alt="" class="ball">
    </div>

    <div class="waiting" id="waiting">
        待機中
    </div>
    
    <img src="/img/card/pika.png" alt="" class="pokemon" id="pokemon">
    
    <div class="battle" id="battleBtn" @click="onBattle">
        Battle!
    </div>
    
    <div class="veil" id="veil"></div>
    
    <div class="press-start" id="press_start" @click="onStartTapped">
        TAP TO START
    </div>

    <div class="control" @click="()=>{changeScene('entryControl')}"></div>
</template>

<style scoped>

.background{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: contrast(50%) brightness(130%);
}

.ball-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.ball{
    width: 50%;
}


.waiting{
    position: fixed;
    top: 37%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1200%;

    -webkit-text-fill-color: white; /* （順序に関係なく）色を上書きする */
    -webkit-text-stroke: 3px black;
}

.pokemon{
    position: fixed;
    top: 37%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20%;
    opacity: 0;
    display: none;
}

.battle{
    position: fixed;
    top: 80%;
    left: 50%;
    width: 60%;
    transform: translate(-50%, -50%);

    width: 300px;
    height: 60px;
    background-color: #ff109f;
    color: white;
    font-size: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    letter-spacing: -1px;
    cursor: pointer;
    box-shadow: 2px 2px 4px -2px gray inset
  }

  .veil{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgb(25, 25, 25);
    opacity: 0;
    display:  none;
  }

  .press-start{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: rgba(0, 0, 0, 0.421);
    font-size: 600%;
  }

  .control{
    width: 10px;
    height : 10px;
    background-color: white;
    position: fixed;
    top: 10px;
    left: 10px;
  }
</style>
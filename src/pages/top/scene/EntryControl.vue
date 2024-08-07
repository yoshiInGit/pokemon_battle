<script setup lang="ts">
import { useGlobalEvent } from "../event/global_event";
import MyuAsset from "@/assets/img/card/myu.png"

const {changeScene} = useGlobalEvent();

const channel = new BroadcastChannel("pokemon-battle");

const setPokemon = () => {
    channel.postMessage({
        order   : "pokemon-set",
        payload : ""
    });
}

const startBattle = () => {
    channel.postMessage({
        order   : "start-battle",
        payload : ""
    });
}
</script>

<template>
    <div class="wrapper">
        <div class="card-selector">
            <div class="card-wrapper" @click="setPokemon">
                <img  class="card" :src="MyuAsset">
                <div class="card-name">ほげほげ</div>
            </div>
            <div class="card-wrapper">
                <img  class="card" :src="MyuAsset">
                <div class="card-name">ほげほげ</div> 
            </div>
            <div class="card-wrapper">
                <img  class="card" :src="MyuAsset">
                <div class="card-name">ほげほげ</div>
            </div>
            <div class="card-wrapper">
                <img  class="card" :src="MyuAsset">
                <div class="card-name">ほげほげ</div>
            </div>
            <div class="card-wrapper">
                <img  class="card" :src="MyuAsset">
                <div class="card-name">ほげほげ</div>
            </div>
            <div class="card-wrapper">
                <img  class="card" :src="MyuAsset">
                <div class="card-name">ほげほげ</div>
            </div>
            <div class="card-wrapper">
                <img  class="card" :src="MyuAsset">
                <div class="card-name">ほげほげ</div>
            </div>
            <div class="card-wrapper">
                <img  class="card" :src="MyuAsset">
                <div class="card-name">ほげほげ</div>
            </div>
            <div class="card-wrapper">
                <img  class="card" :src="MyuAsset">
                <div class="card-name">ほげほげ</div>
            </div>
            <div class="card-wrapper">
                <img  class="card" :src="MyuAsset">
                <div class="card-name">ほげほげ</div>
            </div>
            <div class="card-wrapper">
                <img  class="card" :src="MyuAsset">
                <div class="card-name">ほげほげ</div>
            </div>
            <div class="card-wrapper">
                <img  class="card" :src="MyuAsset">
                <div class="card-name">ほげほげ</div>
            </div>
            <div class="card-wrapper">
                <img  class="card" :src="MyuAsset">
                <div class="card-name">ほげほげ</div>
            </div>
            <div class="card-wrapper">
                <img  class="card" :src="MyuAsset">
                <div class="card-name">ほげほげ</div>
            </div>
            <div class="card-wrapper">
                <img  class="card" :src="MyuAsset">
                <div class="card-name">ほげほげ</div>
            </div>
            <div class="card-wrapper">
                <img  class="card" :src="MyuAsset">
                <div class="card-name">ほげほげ</div>
            </div>
            <div class="card-wrapper">
                <img  class="card" :src="MyuAsset">
                <div class="card-name">ほげほげ</div>
            </div>
        </div>
        <div class="controller">
            <select class="enemy-selector">
                <option>敵ポケモン１</option>
                <option>敵ポケモン２</option>
                <option>敵ポケモン３</option>
            </select>

            <div class="battle-btn" @click="startBattle">バトル開始</div>

            <div class="change-ctr-btn" @click="changeScene('battle-control')">バトル操作画面</div>
        </div>
    </div>

    <div class="" @click="changeScene('battle-control')">Battle control</div>
</template>

<style>
.wrapper{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
}

.card-selector{
    height: 100%;
    overflow: scroll;
    overflow-x: hidden;
    width: 80%;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 28px;
    flex-wrap: wrap;

}

.controller{
    height: 100%;
    width: 20%;

    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;

    gap: 40px;
}

.card-wrapper{
    width: 15%;
    aspect-ratio: 31/37;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.card{
    display: block;
    width: 100%;
    cursor: pointer;
}

.card-name{
    font-family : "Noto Sans JP", sans-serif;
    font-optical-sizing: auto;
    font-style  : normal;
}

.enemy-selector{
    width: 80%;
    font-size: 20px;
}

.battle-btn{
    width:  80%;
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

.change-ctr-btn{
    width:  80%;
    height: 60px;
    background-color: #103b91;
    color: white;
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    letter-spacing: -1px;
    cursor: pointer;
    box-shadow: 2px 2px 4px -2px gray inset
}

</style>
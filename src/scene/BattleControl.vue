<script setup>
const channel = new BroadcastChannel("pokemon-battle");

const attack = (atkNum) => {
    channel.postMessage({
        order   : "attack",
        payload : atkNum
    });
}

</script>


<template>
    <div @click="()=>{attack('1')}">ATK1</div>
    <div @click="()=>{attack('2')}">ATK2</div>
    <div @click="()=>{attack('3')}">ATK3</div>
</template>
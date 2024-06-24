import { defineStore } from 'pinia'
import { ref } from 'vue';

export const useGlobalEvent = defineStore('globalEvent', () => {
    const currentScene = ref("entry");

    const changeScene = (sceneName : string) => {
        currentScene.value = sceneName;
    }

    return {currentScene, changeScene}
})
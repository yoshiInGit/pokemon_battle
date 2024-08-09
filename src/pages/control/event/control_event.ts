import type { Pokemon } from "@/domain/pokemon";
import { Myutu } from "@/domain/pokemons/myutu";
import { Pikachu } from "@/domain/pokemons/pikachu";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalEvent = defineStore("globalEvent", () => {
    type Scenes = "entry-control" | "battle-control";
    const currentScene = ref<Scenes>("entry-control");

    const changeScene = (sceneName: Scenes) => {
        currentScene.value = sceneName;
    };

    const p1Pokemon = ref<Pokemon>(new Myutu());
    const setP1Pokemon = (pokemon: Pokemon) => {
        p1Pokemon.value = pokemon;
    };

    const p2Pokemon = ref<Pokemon>(new Pikachu());
    const setP2Pokemon = (pokemon: Pokemon) => {
        p2Pokemon.value = pokemon;
    };

    return {
        currentScene,
        changeScene,
        // p1Pokemon,
        setP1Pokemon,
        // p2Pokemon,
        setP2Pokemon,
    };
});

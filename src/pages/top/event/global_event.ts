import { StageAssets, type GymKeys } from "@/domain/gym_pokemon";
import { PlayerOptions, type PlayerKeys } from "@/domain/player_pokemon";
import type { Pokemon } from "@/domain/pokemon";
import { GymPokemon } from "@/domain/pokemons/gym";
import { Myutu } from "@/domain/pokemons/myutu";
import { Player } from "@/domain/pokemons/player";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalEvent = defineStore("globalEvent", () => {
  type Scenes = "entry" | "battle";
  const currentScene = ref<Scenes>("entry");

  const changeScene = (sceneName: Scenes) => {
    currentScene.value = sceneName;
  };

  const p1Pokemon = ref<Pokemon>(new Myutu());
  const setP1Pokemon = (playerKey: PlayerKeys) => {
    const pokemon = PlayerOptions[playerKey];
    p2Pokemon.value = new GymPokemon(
      pokemon.name,
      pokemon.hp,
      pokemon.type,
      pokemon.rank,
      pokemon.atkNames,
      pokemon.cutinImgUrl,
      pokemon.src,
    );
  };

  const p2Pokemon = ref<Pokemon>(new Player("", 0, 0, 0, ["", "", ""], ["", ""], ""));
  const setP2Pokemon = (gymLeaderKey: GymKeys) => {
    const pokemon = StageAssets[gymLeaderKey];
    p1Pokemon.value = new Player(
      pokemon.pokemonName,
      pokemon.hp,
      pokemon.type,
      pokemon.rank,
      pokemon.atkNames,
      ["", ""],
      pokemon.cardSrc,
    );
  };

  return { currentScene, changeScene, p1Pokemon, setP1Pokemon, p2Pokemon, setP2Pokemon };
});

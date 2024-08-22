import { StageAssets, type GymKeys } from "@/domain/gym_pokemon";
import { CutinImgAssets, PlayerOptions, type PlayerKeys } from "@/domain/player_pokemon";
import { GymPokemon } from "@/domain/pokemons/gym";
import { Myutu } from "@/domain/pokemons/myutu";
import { Player } from "@/domain/pokemons/player";
import type { SupportKeys } from "@/domain/support_card";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useGlobalEvent = defineStore("globalEvent", () => {
  type Scenes = "entry" | "battle";
  const currentScene = ref<Scenes>("entry");

  const changeScene = (sceneName: Scenes) => {
    currentScene.value = sceneName;
  };

  const p1Pokemon = ref<GymPokemon>(new Myutu());
  const setP1Pokemon = (gymLeaderKey: GymKeys) => {
    const pokemon = StageAssets[gymLeaderKey];
    p1Pokemon.value = new GymPokemon(
      pokemon.pokemonName,
      pokemon.hp,
      pokemon.type,
      pokemon.rank,
      pokemon.atkName,
      pokemon.cutinImgSrc,
      pokemon.cardSrc,
    );
  };

  const useSupportBoostEnergy = ref<boolean>(false);

  const setSupportUsage = (supportKey: SupportKeys) => {
    if (supportKey === "01") {
      useSupportBoostEnergy.value = true;
    }
  };

  const p2Pokemon = ref<Player>(new Player());
  const setP2Pokemon = (playerKey: PlayerKeys) => {
    const pokemon = PlayerOptions[playerKey];
    const newPlayer = new Player(
      pokemon.name,
      pokemon.hp,
      pokemon.type,
      pokemon.rank,
      pokemon.atkNames,
      CutinImgAssets[playerKey],
      pokemon.src,
      pokemon.cutinVideoAsset,
    );

    p2Pokemon.value = newPlayer;
  };

  return {
    currentScene,
    changeScene,
    p1Pokemon,
    setP1Pokemon,
    p2Pokemon,
    setP2Pokemon,
    setSupportUsage,
    useSupportBoostEnergy: computed(() => useSupportBoostEnergy.value),
  };
});

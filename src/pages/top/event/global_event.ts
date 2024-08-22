import { StageAssets, type GymKeys } from "@/domain/gym_pokemon";
import { CutinImgAssets, PlayerCutinVideoAssets, PlayerOptions, type PlayerKeys } from "@/domain/player_pokemon";
import { GymPokemon } from "@/domain/pokemons/gym";
import { Myutu } from "@/domain/pokemons/myutu";
import { Player } from "@/domain/pokemons/player";
import type { SupportKeys } from "@/domain/support_card";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useGlobalEvent = defineStore("globalEvent", () => {
  type Scenes = "entry" | "battle";
  const currentScene = ref<Scenes>("entry");
  const p1Pokemon = ref<GymPokemon>(new Myutu());
  const useSupportBoostEnergy = ref<boolean>(false);
  const p2Pokemon = ref<Player>(new Player());

  const $reset = () => {
    currentScene.value = "entry";
    p1Pokemon.value = new Myutu();
    useSupportBoostEnergy.value = false;
    p2Pokemon.value = new Player();
  };

  const changeScene = (sceneName: Scenes) => {
    currentScene.value = sceneName;
  };

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

  const setSupportUsage = (supportKey: SupportKeys) => {
    if (supportKey === "01") {
      useSupportBoostEnergy.value = true;
    }
  };

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
      PlayerCutinVideoAssets[playerKey],
    );

    p2Pokemon.value = newPlayer;
  };

  return {
    currentScene,
    changeScene,
    p1Pokemon: computed(() => p1Pokemon),
    setP1Pokemon,
    p2Pokemon: computed(() => p2Pokemon),
    setP2Pokemon,
    setSupportUsage,
    useSupportBoostEnergy: computed(() => useSupportBoostEnergy.value),
    $reset,
  };
});

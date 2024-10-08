import { defineStore } from "pinia";
import { fadein, show, sleep_ms } from "@/helper";
import { Howl } from "howler";
import startBgmUrl from "@/assets/sound/bgm/start_music.mp3";
import pironUrl from "@/assets/sound/effect/piron.mp3";
import shiiinUrl from "@/assets/sound/effect/shiiin.mp3";
import { useGlobalEvent } from "./global_event";
import { ref } from "vue";
import type { PlayerKeysType } from "@/domain/player_pokemon";
import type { GymKeysType } from "@/domain/gym_pokemon";
import type { SupportKeys } from "@/domain/support_card";
// import { useBattleEvent } from './battle_event';

const snd_bgm = new Howl({ src: startBgmUrl, loop: true });
const snd_piron = new Howl({ src: pironUrl });
const snd_shiiin = new Howl({ src: shiiinUrl });

const fadeoutAll = () => {
  snd_bgm.fade(100, 0, 500);
  snd_piron.fade(100, 0, 500);
  snd_shiiin.fade(100, 0, 500);
};

export const useEntryEvent = defineStore("entryEvent", () => {
  const playerKey = ref<PlayerKeysType | null>(null);

  const $reset = () => {
    fadeoutAll();
    playerKey.value = null;
  };

  const setPlayerKey = (key: PlayerKeysType) => {
    playerKey.value = key;
  };

  const onStartTapped = () => {
    snd_bgm.play();
  };

  const onBattle = async ({
    gymLeaderKey,
    playerKey,
    supportCards,
  }: {
    gymLeaderKey: GymKeysType;
    playerKey: PlayerKeysType;
    supportCards: Array<SupportKeys>;
  }) => {
    const globalStore = useGlobalEvent();
    globalStore.setP1Pokemon(gymLeaderKey);
    globalStore.setP2Pokemon(playerKey);

    supportCards.forEach((key) => {
      globalStore.setSupportUsage(key);
    });

    snd_piron.play();

    await sleep_ms(400);

    snd_shiiin.play();
    await sleep_ms(700);

    show({ id: "veil" });
    fadein({ targets: "#veil", time_ms: 500 });

    snd_bgm.fade(1, 0, 300);

    await sleep_ms(600);

    globalStore.changeScene("battle");

    //useBattleEvent().startBattle();
  };

  return {
    playerKey,
    setPlayerKey,
    onStartTapped,
    onBattle,
    $reset,
  };
});

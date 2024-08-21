import { defineStore } from "pinia";
import anime from "animejs";
import { fadein, hide, show, sleep_ms } from "@/helper";
import { Howl } from "howler";
import startBgmUrl from "@/assets/sound/bgm/start_music.mp3";
import pironUrl from "@/assets/sound/effect/piron.mp3";
import shiiinUrl from "@/assets/sound/effect/shiiin.mp3";
import { useGlobalEvent } from "./global_event";
import { ref } from "vue";
import type { PlayerKeys } from "@/domain/player_pokemon";
import type { GymKeys } from "@/domain/gym_pokemon";
import type { SupportKeys } from "@/domain/support_card";
// import { useBattleEvent } from './battle_event';

const snd_bgm = new Howl({ src: startBgmUrl });
const snd_piron = new Howl({ src: pironUrl });
const snd_shiiin = new Howl({ src: shiiinUrl });

export const useEntryEvent = defineStore("entryEvent", () => {
  const playerKey = ref<PlayerKeys | null>(null);
  const setPlayerKey = (key: PlayerKeys) => {
    playerKey.value = key;
  };

  const onStartTapped = () => {
    // anime({
    //     targets: ".ball",
    //     rotateY: 90,
    //     duration: 1000,
    //     direction: "alternate",
    //     loop: true,
    //     easing: "easeInOutSine",
    // });

    snd_bgm.play();

    hide({ id: "press_start" });
  };

  const onBattle = async ({
    gymLeaderKey,
    playerKey,
    supportCards,
  }: {
    gymLeaderKey: GymKeys;
    playerKey: PlayerKeys;
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

    anime({
      targets: "#pokemon",
      translateX: ["-50%", "-50%"],
      translateY: ["-50%", "-1000%"],
      duration: 1000,
      easing: "easeInBack",
    });
    await sleep_ms(500);
    snd_shiiin.play();
    await sleep_ms(700);

    show({ id: "veil" });
    fadein({ targets: "#veil", time_ms: 500 });

    snd_bgm.fade(1, 0, 300);

    await sleep_ms(600);

    globalStore.changeScene("battle");

    //useBattleEvent().startBattle();
  };

  return { playerKey, setPlayerKey, onStartTapped, onBattle };
});

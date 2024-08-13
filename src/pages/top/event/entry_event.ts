import { defineStore } from "pinia";
import anime from "animejs";
import { fadein, fadeout, hide, show, sleep_ms } from "@/helper";
import { Howl } from "howler";
import startBgmUrl from "@/assets/sound/bgm/start_music.mp3";
import pironUrl from "@/assets/sound/effect/piron.mp3";
import shiiinUrl from "@/assets/sound/effect/shiiin.mp3";
import { useGlobalEvent } from "./global_event";
// import { useBattleEvent } from './battle_event';

const snd_bgm = new Howl({ src: startBgmUrl });
const snd_piron = new Howl({ src: pironUrl });
const snd_shiiin = new Howl({ src: shiiinUrl });

export const useEntryEvent = defineStore("entryEvent", () => {
    const onStartTapped = () => {
        anime({
            targets: ".ball",
            rotateY: 90,
            duration: 1000,
            direction: "alternate",
            loop: true,
            easing: "easeInOutSine",
        });

        snd_bgm.play();

        hide({ id: "press_start" });
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onPokemonSet = async (pokemon: string) => {
        await fadeout({ targets: "#waiting", time_ms: 200 });
        hide({ id: "waiting" });

        await sleep_ms(100);

        show({ id: "pokemon" });
        await fadein({ targets: "#pokemon", time_ms: 180 });
    };

    const onBattle = async () => {
        snd_piron.play();

        anime({
            targets: "#battleBtn",
            opacity: 0,
            scale: 1.5,
            translateX: ["-50%", "-36%"],
            translateY: ["-50%", "-36%"],
            duration: 500,
            easing: "easeOutCirc",
        });

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

        useGlobalEvent().changeScene("battle");

        //useBattleEvent().startBattle();
    };

    return { onStartTapped, onPokemonSet, onBattle };
});

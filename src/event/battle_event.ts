import { changeImg, fadein, fadeout, hide, setValue, sleep_ms } from '@/helper';
import anime from 'animejs';
import { defineStore } from 'pinia'
import { Howl } from 'howler';
import { ref } from 'vue';
import boltBgmUrl from '../assets/sound/bgm/boltecker.mp3'

const snd_bgm = new Howl({src : boltBgmUrl});


export const useBattleEvent = defineStore('battleEvent', () => {
    const startBattle = async () => {

        snd_bgm.volume(0)
        snd_bgm.play();
        snd_bgm.fade(0,1,3000);
        
        await fadeout({targets : "#veil", time_ms : 3000, easing : "easeInCirc"});
        
        hide({id : "veil"});
    
        await sleep_ms(800);
    
        // snd_sunn.play();
        await fadein({targets : "#player1Card,#player2Card", time_ms : 500});
    
        await sleep_ms(300);
    
        anime({
            targets : "#player1Card,#player2Card",
            duration: 2000,
            rotateY : "990deg",
            easing: 'easeOutCirc'
        })
        await sleep_ms(2000);
    
        changeImg({id : "player1Card", src : "/img/card/card.png"});
        changeImg({id : "player2Card", src : "/img/card/card.png"});
    
        // snd_zutinn.play()
        anime({
            targets : "#player1Card,#player2Card",
            duration: 1500,
            rotateY : "1080deg",
            easing: 'easeInQuad'
        })
        await sleep_ms(1500);
    
    
        // snd_studiam.play()
        // snd_kya.play()
    
        await sleep_ms(300);
    
    
        setValue({id : "player1Inf_name", value : "ミューツー"});
        setValue({id : "player2Inf_name", value : "ピカチュウ"});
    
        anime({
            targets : "#player1Inf_hpIndicator,#player2Inf_hpIndicator",
            duration: 4000,
            width : "100%",
            easing : "easeOutCirc",
        })
    
        let hps = {
            p1 : 0,
            p2 : 0
        }
        anime({
            targets : hps,
            p1 : 100,
            p2 : 100,
            round : 1,
            easing: 'easeOutCirc',
            duration : 4000,
            update: function() {
                setValue({id : "player1Inf_hp", value : `${hps.p1}/100`})
                setValue({id : "player2Inf_hp", value : `${hps.p2}/100`})
            }
        })
        await sleep_ms(4000);
    
        await sleep_ms(500);
    }

    return {startBattle}
})
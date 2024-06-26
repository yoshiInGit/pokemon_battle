import { fadein, fadeout, hide, sleep_ms } from '@/helper';
import anime from 'animejs';
import { defineStore } from 'pinia'
import { Howl } from 'howler';
import { computed, ref } from 'vue';
import boltBgmUrl from '../assets/sound/bgm/boltecker.mp3'
import sndSunnUrl from '../assets/sound/effect/sunn.mp3'
import sndZutiinUrl from '../assets/sound/effect/zutiin.mp3'
import sndStudiamUrl from '../assets/sound/effect/studiam.mp3'
import sndKyaUrl from '../assets/sound/effect/kya-.mp3'


const sndBgm = new Howl({src : boltBgmUrl, volume : 0});
const sndSunn = new Howl({src : sndSunnUrl});
const sndZutinn = new Howl({src : sndZutiinUrl});
const sndStuidam = new Howl({src : sndStudiamUrl});
const sndKya = new Howl({src : sndKyaUrl});



export const useBattleEvent = defineStore('battleEvent', () => {
    const p1CardImgUrl = ref("/img/card/card.png");
    const p2CardImgUrl = ref("/img/card/card.png");

    const p1Name = ref("---");
    const p2Name = ref("---");

    const p1Hp = ref(0);
    const p2Hp = ref(0);
    const p1HpStr = computed(()=>`${p1Hp.value}/100`);
    const p2HpStr = computed(()=>`${p2Hp.value}/100`);
    const p1HpRate = computed(()=>p1Hp.value/100);
    const p2HpRate = computed(()=>p2Hp.value/100);

    
    const startBattle = async () => {

        sndBgm.volume(0)
        sndBgm.play();
        sndBgm.fade(0,0.2,3000);
        
        await fadeout({targets : "#veil", time_ms : 3000, easing : "easeInCirc"});
        
        hide({id : "veil"});
    
        await sleep_ms(800);
    
        sndSunn.play()
        await fadein({targets : "#player1Card,#player2Card", time_ms : 500});
    
        await sleep_ms(300);
    
        anime({
            targets : "#player1Card,#player2Card",
            duration: 2000,
            rotateY : "990deg",
            easing: 'easeOutCirc'
        })
        await sleep_ms(2000);
    
        p1CardImgUrl.value = "/img/card/myu.png"
        p2CardImgUrl.value = "/img/card/pika.png"

        anime({
            targets : "#player1Card,#player2Card",
            duration: 1500,
            rotateY : "1080deg",
            easing: 'easeInQuad'
        })
        await sleep_ms(1500);
        sndZutinn.play();

        await sleep_ms(400);
    
        sndStuidam.play();
        sndKya.play();
    
        await sleep_ms(300);
    
        p1Name.value = "ミューツー";
        p2Name.value = "ピカチュウ";
    
        //HPアニメーション
        // もっとスマートな書き方ある？
        let hps_tmp = {p1 : 0, p2 : 0}
        anime({
            targets : hps_tmp,
            p1 : 100,
            p2 : 100,
            round : 1,
            easing: 'easeOutCirc',
            duration : 4000,
            update: function() {
                p1Hp.value = hps_tmp.p1;
                p2Hp.value = hps_tmp.p2;
            }
        })
        await sleep_ms(4000);
    
        await sleep_ms(500);
    }

    return {p1CardImgUrl, p2CardImgUrl, p1Name, p2Name, p1HpStr, p2HpStr, p1HpRate, p2HpRate, startBattle}
})
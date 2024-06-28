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
import {useGlobalEvent} from './global_event'
import pironUrl from '../assets/sound/effect/piron.mp3'
import type { Pokemon } from '@/domain/pokemon';



const sndBgm = new Howl({src : boltBgmUrl, volume : 0});
const sndSunn = new Howl({src : sndSunnUrl});
const sndZutinn = new Howl({src : sndZutiinUrl});
const sndStuidam = new Howl({src : sndStudiamUrl});
const sndKya = new Howl({src : sndKyaUrl});
const sndPiron  = new Howl({src : pironUrl});



export const useBattleEvent = defineStore('battleEvent', () => {
    const globalEventStore = useGlobalEvent();
    const p1Pokemon = globalEventStore.p1Pokemon;
    const p2Pokemon = globalEventStore.p2Pokemon;
    
    const isBattling = ref(false);
    const isShowAtcMenu = ref(false);
    const isShowP1Cutin = ref(false);

    const p1CardImgUrl = ref("/img/card/card.png");
    const p2CardImgUrl = ref("/img/card/card.png");

    const p1CutinImg = ref("");
    const p2CutinImg = ref("");

    const p1Name = ref("---");
    const p2Name = ref("---");

    const p1Hp = ref(0);
    const p2Hp = ref(0);
    const p1HpStr = computed(()=> isBattling.value ? `${p1Hp.value}/${p1Pokemon.hp}` : '--/--');
    const p2HpStr = computed(()=> isBattling.value ? `${p2Hp.value}/${p2Pokemon.hp}` : '--/--');
    const p1HpRate = computed(()=>p1Hp.value/p1Pokemon.hp);
    const p2HpRate = computed(()=>p2Hp.value/p2Pokemon.hp);

    const turnCnt = ref(0);


    
    const startBattle = async () => {

        const p1Pokemon = globalEventStore.p1Pokemon;
        const p2Pokemon = globalEventStore.p2Pokemon;

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
    
        p1CardImgUrl.value = p1Pokemon.cardImgUrl;
        p2CardImgUrl.value = p2Pokemon.cardImgUrl;

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
    
        p1Name.value = p1Pokemon.name
        p2Name.value = p2Pokemon.name
    
        isBattling.value = true;

        //HPアニメーション
        // もっとスマートな書き方ある？
        let hps_tmp = {p1 : 0, p2 : 0}
        anime({
            targets : hps_tmp,
            p1 : p1Pokemon.hp,
            p2 : p2Pokemon.hp,
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

        isShowAtcMenu.value = true;
    }

    const onAtkClicked = async (atkNo : number) => {
        sndPiron.play();

        isShowAtcMenu.value = false;

        if(turnCnt.value % 2 == 0){
            await sleep_ms(200);

            p1CutinImg.value = p2Pokemon.cutinImgUrl[atkNo];
            isShowP1Cutin.value = true;

            anime({
                targets : "#p1cutIn",
                duration: 180,
                clipPath: ["clip-path: polygon(0 39%, 100% 62%, 100% 62%, 0 39%)", "polygon(0 7%, 100% 23%, 100% 91%, 0 74%)"],
                easing: 'easeInQuint'
            })
            await sleep_ms(250);

            await sleep_ms(800);

            isShowP1Cutin.value = false;

            await p2Pokemon.onAttack({no : atkNo});

            // ダメージ処理
            let damagedHp = p1Hp.value - p2Pokemon.atk[atkNo];
            if(damagedHp < 0){
                damagedHp = 0;
            }
            const animation = anime({
                targets: "#player1Card",
                opacity: [0, 0.2, 1],
                duration: 150, // 点滅にかかる時間（ミリ秒）
                loop:true,
                easing: 'steps(3)', // イージング関数
                iterations: Infinity, // 繰り返し回数（無限回）
            });
    
            let hp = {val : p1Hp.value}
            anime({
                targets : hp,
                val : damagedHp,
                duration: p2Pokemon.atk[atkNo] / 2.3,
                easing : "linear",
                round : 1,
                update: function(){
                    p1Hp.value = hp.val
                }
            })
            await sleep_ms(p2Pokemon.atk[atkNo] / 2.3);
    
            animation.pause();
            anime({
                targets : "#player1Card",
                duration: 0,
                opacity : 1,
            })
            // ーーーダメージ処理終了ーーー

            await sleep_ms(400);

            await p2Pokemon.onAttacked({no : atkNo});
        }
    }



    return {p1CardImgUrl, p2CardImgUrl, p1Name, p2Name, p1HpStr, p2HpStr, p1HpRate, p2HpRate, startBattle, isShowAtcMenu, onAtkClicked, isShowP1Cutin}
})
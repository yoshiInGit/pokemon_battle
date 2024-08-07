import { fadein, fadeout, hide, sleep_ms } from '@/helper';
import anime from 'animejs';
import { defineStore } from 'pinia'
import { Howl } from 'howler';
import { computed, ref } from 'vue';
import boltBgmUrl from '@/assets/sound/bgm/boltecker.mp3'
import sndSunnUrl from '@/assets/sound/effect/sunn.mp3'
import sndZutiinUrl from '@/assets/sound/effect/zutiin.mp3'
import sndStudiamUrl from '@/assets/sound/effect/studiam.mp3'
import sndKyaUrl from '@/assets/sound/effect/kya-.mp3'
import {useGlobalEvent} from './global_event'
import pironUrl from '@/assets/sound/effect/piron.mp3'
import type { Pokemon } from '@/domain/pokemon';
import p1CardImgAsset from "@/assets/img/card/card.png"
import p2CardImgAsset from "@/assets/img/card/card.png"


const sndBgm = new Howl({src : boltBgmUrl, volume : 0});
const sndSunn = new Howl({src : sndSunnUrl});
const sndZutinn = new Howl({src : sndZutiinUrl});
const sndStuidam = new Howl({src : sndStudiamUrl});
const sndKya = new Howl({src : sndKyaUrl});
const sndPiron  = new Howl({src : pironUrl});



export const useBattleEvent = defineStore('battleEvent', () => {
    const globalEventStore = useGlobalEvent();

    const messageText = ref("");

    const p1Pokemon = globalEventStore.p1Pokemon;
    const p2Pokemon = globalEventStore.p2Pokemon;
    
    const isBattling = ref(false);
    const isShowAtcMenu = ref(false);
    const isShowCutin = ref(false);

    const p1CardImgUrl = ref(p1CardImgAsset);
    const p2CardImgUrl = ref(p2CardImgAsset);

    const cutinImg = ref("");

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

        // ターン別処理
        const isP2Turn = turnCnt.value % 2 == 0
        let attackingPokemon = isP2Turn ? p2Pokemon : p1Pokemon;
        let attackedPokemon  = isP2Turn ? p1Pokemon : p2Pokemon;
        let attackedCardId   = isP2Turn ? "#player1Card" : "#player2Card";
        let attackedHp       = isP2Turn ? p1Hp : p2Hp;
        
        await sleep_ms(200);

        //攻撃メッセージ
        await _openMessageBox();
        await _typeMessage(attackingPokemon.name+" は、\n"+attackingPokemon.atkName[atkNo]+ "を　はなった！");
        await sleep_ms(1000);
        await _closeMessageBog();

        await sleep_ms(300);

        //カットイン
        _shakeStage(300);
        cutinImg.value = attackingPokemon.cutinImgUrl[atkNo];
        isShowCutin.value = true;
    
        anime({
            targets : "#cutIn",
            duration: 100,
            clipPath: ["clip-path: polygon(0 39%, 100% 62%, 100% 62%, 0 39%)", "polygon(0 7%, 100% 23%, 100% 91%, 0 74%)"],
            easing: 'easeInQuint'
        })
        await sleep_ms(100);

        await sleep_ms(800);

        anime({
            targets : "#cutIn",
            duration: 100,
            clipPath: ["clip-path: polygon(0 7%, 100% 23%, 100% 91%, 0 74%)","polygon(0 39%, 100% 62%, 100% 62%, 0 39%)"],
            easing: 'easeInQuint'
        })
        await sleep_ms(180);

        isShowCutin.value = false;
        //カットイン---------------

        await attackingPokemon.onAttack({no : atkNo});

        // ダメージ処理
        let damagedHp = attackedHp.value - attackingPokemon.atk[atkNo];
        if(damagedHp < 0){
            damagedHp = 0;
        }
        const animation = anime({
            targets: attackedCardId,
            opacity: [0, 0.2, 1],
            duration: 150, // 点滅にかかる時間（ミリ秒）
            loop:true,
            easing: 'steps(3)', // イージング関数
            iterations: Infinity, // 繰り返し回数（無限回）
        });

        let hp = {val : attackedHp.value}
        anime({
            targets : hp,
            val : damagedHp,
            duration: attackingPokemon.atk[atkNo] / 2.3,
            easing : "linear",
            round : 1,
            update: function(){
                attackedHp.value = hp.val
            }
        })
        await sleep_ms(attackingPokemon.atk[atkNo] / 2.3);

        animation.pause();
        anime({
            targets : attackedCardId,
            duration: 0,
            opacity : 1,
        })
        // ーーーダメージ処理終了ーーー
        await sleep_ms(400);
        
        await attackingPokemon.onAttacked({no : atkNo});

        await sleep_ms(300);

        await _openMessageBox();
        await _typeMessage(attackedPokemon.name + " は、\n"+ attackingPokemon.atk[atkNo] + " ダメージ　うけた！");
        await sleep_ms(1000);
        await _closeMessageBog();
        
        await sleep_ms(400);

        if(attackedHp.value == 0){
            _onGameEnded(isP2Turn);
            return;
        }
        
        _onTurnEnded();
    }

    const _onTurnEnded = () => {

        turnCnt.value = turnCnt.value + 1;

        // プレイヤー同士の対戦ときはここいじる
        if(turnCnt.value % 2==0){
            isShowAtcMenu.value = true;
            return;
        }else{
            onAtkClicked(_getRandomInt(3));
            return;
        }
    }

    const _onGameEnded = async (isP2Turn : boolean) => {
        anime({
            targets: isP2Turn ? "#player1Card" : "#player2Card",
            translateY : 9000,
            rotate  : "33deg",
            duration: 800, // 点滅にかかる時間（ミリ秒）
            easing: 'easeInCubic', // イージング関数
        });
        await sleep_ms(800)

        await _openMessageBox();
        await _typeMessage(isP2Turn ? p2Pokemon.name + "　は　ショウリ　した！" : p2Pokemon.name + "　は　ハイボク　した…");
        await sleep_ms(1000);
        await _closeMessageBog();


        anime({
            targets: "#winLoseWrapper",
            opacity : 0.6,
            duration: 1300, // 点滅にかかる時間（ミリ秒）
            easing: 'linear', // イージング関数
        });
        await sleep_ms(1300);
        console.log("ok1")


        if(isP2Turn){

        }else{
            console.log("ok2")
            anime({
                targets : "#lose",
                top : "22%",
                duration : 1400,
                easing : "easeOutBounce",
            })
            console.log("ok3")
        }
    }

    const _getRandomInt = (max : number) => {
        return Math.floor(Math.random() * max);
    }

    const _openMessageBox = async () => {
        anime({
            targets  : "#messageBox",
            width    : "90%",
            duration : 150,
            easing   : "easeInQuint"
        });
        await sleep_ms(150);
    }

    const  _closeMessageBog = async () => {
        messageText.value = ""

        anime({
            targets  : "#messageBox",
            width    : "0%",
            duration : 150,
            easing   : "easeInQuint"
        });
        await sleep_ms(150);
    } 

    const _typeMessage = async (text : string) => {
        for(let i=0;i<text.length+1;i++){
            messageText.value = text.slice(0, i);
            await sleep_ms(40);
        }
    }

    const _shakeStage = async (duration : number) => {
        const animation = anime({
            targets : "#scene",
            duration : 80,
            loop : true,
            translateX : [0, 6, 0, 6, 0],
            translateY : [0, 6, 6, 0, 0],
        })

        await sleep_ms(duration);

        animation.pause();
    }

    const onSupportCardUsed = async (cardName : string) => {

    }

    return {
        messageText,
        p1CardImgUrl, 
        p2CardImgUrl, 
        p1Name, 
        p2Name, 
        p1HpStr, 
        p2HpStr, 
        p1HpRate, 
        p2HpRate, 
        isShowAtcMenu, 
        isShowCutin,
        startBattle, 
        onAtkClicked, 
    }
})
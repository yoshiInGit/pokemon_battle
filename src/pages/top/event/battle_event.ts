import { fadein, fadeout, hide, sleep_ms } from "@/helper";
import anime from "animejs";
import { defineStore } from "pinia";
import { Howl } from "howler";
import { computed, ref } from "vue";
import boltBgmUrl from "@/assets/sound/bgm/boltecker.mp3";
import sndSunnUrl from "@/assets/sound/effect/sunn.mp3";
import sndZutiinUrl from "@/assets/sound/effect/zutiin.mp3";
import sndStudiamUrl from "@/assets/sound/effect/studiam.mp3";
import sndKyaUrl from "@/assets/sound/effect/kya-.mp3";
import { useGlobalEvent } from "./global_event";
// import pironUrl from "@/assets/sound/effect/piron.mp3";
import p1CardImgAsset from "@/assets/img/card/card.png";
import p2CardImgAsset from "@/assets/img/card/card.png";
import type { Pokemon } from "@/domain/pokemon";
import { getTypeCompatibility, TypeCompatibility } from "@/domain/pokemonType";
import { PinchSituation } from "@/domain/pinchSituation";
import { Config } from "@/domain/config";

const sndBgm = new Howl({ src: boltBgmUrl, volume: 0 });
const sndSunn = new Howl({ src: sndSunnUrl });
const sndZutinn = new Howl({ src: sndZutiinUrl });
const sndStuidam = new Howl({ src: sndStudiamUrl });
const sndKya = new Howl({ src: sndKyaUrl });
// const sndPiron = new Howl({ src: pironUrl });

export const useBattleEvent = defineStore("battleEvent", () => {
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
    const p1HpStr = computed(() => (isBattling.value ? `${p1Hp.value}/${p1Pokemon.hp}` : "--/--"));
    const p2HpStr = computed(() => (isBattling.value ? `${p2Hp.value}/${p2Pokemon.hp}` : "--/--"));
    const p1HpRate = computed(() => p1Hp.value / p1Pokemon.hp);
    const p2HpRate = computed(() => p2Hp.value / p2Pokemon.hp);

    // 初期演出
    const startBattle = async () => {
        const p1Pokemon = globalEventStore.p1Pokemon;
        const p2Pokemon = globalEventStore.p2Pokemon;

        sndBgm.volume(0);
        sndBgm.play();
        sndBgm.fade(0, 0.2, 3000);

        await fadeout({ targets: "#veil", time_ms: 3000, easing: "easeInCirc" });

        hide({ id: "veil" });

        await sleep_ms(800);

        sndSunn.play();
        await fadein({ targets: "#player1Card,#player2Card", time_ms: 500 });

        await sleep_ms(300);

        anime({
            targets: "#player1Card,#player2Card",
            duration: 2000,
            rotateY: "990deg",
            easing: "easeOutCirc",
        });
        await sleep_ms(2000);

        p1CardImgUrl.value = p1Pokemon.cardImgUrl;
        p2CardImgUrl.value = p2Pokemon.cardImgUrl;

        anime({
            targets: "#player1Card,#player2Card",
            duration: 1500,
            rotateY: "1080deg",
            easing: "easeInQuad",
        });
        await sleep_ms(1500);
        sndZutinn.play();

        await sleep_ms(400);

        sndStuidam.play();
        sndKya.play();

        await sleep_ms(300);

        p1Name.value = p1Pokemon.name;
        p2Name.value = p2Pokemon.name;

        isBattling.value = true;

        //HPアニメーション
        // もっとスマートな書き方ある？
        const hps_tmp = { p1: 0, p2: 0 };
        anime({
            targets: hps_tmp,
            p1: p1Pokemon.hp,
            p2: p2Pokemon.hp,
            round: 1,
            easing: "easeOutCirc",
            duration: 4000,
            update: function () {
                p1Hp.value = hps_tmp.p1;
                p2Hp.value = hps_tmp.p2;
            },
        });
        await sleep_ms(4000);

        await sleep_ms(500);

        _preBattle();
    };

    //HPが一定値以下になるまで攻撃しあう段階
    const _preBattle = async () => {
        await sleep_ms(500);

        const { necessaryTurn, p2AttackPower } = _calculateAttackScenario(p1Pokemon, p2Pokemon);

        console.log("ターン数、味方攻撃力");
        console.log({ necessaryTurn, p2AttackPower });

        for (let turnCnt = 0; turnCnt < necessaryTurn * 2; turnCnt++) {
            const isP2Turn = turnCnt % 2 == 0;

            // const attackingPokemon = isP2Turn ? p2Pokemon : p1Pokemon;
            // const attackedPokemon  = isP2Turn ? p1Pokemon : p2Pokemon;
            const attackingCardId = isP2Turn ? "#player2Card" : "#player1Card"; // 攻撃する側
            const attackedCardId = isP2Turn ? "#player1Card" : "#player2Card"; // 攻撃される側
            const attackDirection = isP2Turn ? -1 : 1; // 攻撃アニメーションが左に移動するものか、右に移動するものか

            // 演習開始
            anime({
                targets: attackingCardId,
                translateX: 130 * attackDirection + "%",
                duration: 250,
                easing: "easeInBack",
            });
            await sleep_ms(250);

            //点滅アニメーション
            const damageAnime = anime({
                targets: attackedCardId,
                opacity: [0, 0.2, 1],
                duration: 150, // 点滅にかかる時間（ミリ秒）
                loop: true,
                easing: "steps(3)", // イージング関数
                iterations: Infinity, // 繰り返し回数（無限回）
            });
            //HPアニメーション
            const targetHp = isP2Turn ? { value: p1Hp.value } : { value: p2Hp.value };
            const damage = isP2Turn ? p2AttackPower : Config.enemyAttackPower;
            anime({
                targets: targetHp,
                value: targetHp.value - damage,
                duration: 2100,
                round: 1,
                easing: "linear",
                update: function () {
                    if (isP2Turn) {
                        p1Hp.value = targetHp.value;
                    } else {
                        p2Hp.value = targetHp.value;
                    }
                },
            });

            _shakeStage(600);

            anime({
                targets: attackingCardId,
                translateX: "0%",
                duration: 100,
                easing: "easeOutExpo",
            });
            await sleep_ms(100);

            await sleep_ms(2000);

            damageAnime.pause();
            anime({
                targets: attackedCardId,
                duration: 0,
                opacity: 1,
            });
            await sleep_ms(300);
        }

        await _openMessageBox();
        await _typeMessage(p2Pokemon.name + "　ピンチ！！");
        await sleep_ms(700);

        isShowAtcMenu.value = true;
    };

    const onAtkClicked = async (atkNo: number) => {
        // atkNo:0 ⇒ 強技(成功率20%)
        // atkNo:1 ⇒ 中技(成功率50%)
        // atkNo:2 ⇒ 弱技(成功率99%)

        console.log("ark no : " + atkNo);

        let attackSuccessRate = 1;
        if (atkNo == 0) {
            attackSuccessRate = Config.strongAttackSuccessRate;
        }
        if (atkNo == 1) {
            attackSuccessRate = Config.normalAttackSuccessRate;
        }
        if (atkNo == 2) {
            attackSuccessRate = Config.weakAttackSuccessRate;
        }

        console.log("攻撃成功率: " + attackSuccessRate);

        const isAttackSuccess = _getRandomBinary(attackSuccessRate);

        //演出開始
        isShowAtcMenu.value = false;
        await _closeMessageBog();

        await sleep_ms(300);

        //攻撃メッセージ
        await _openMessageBox();
        await _typeMessage(p2Pokemon.name + " は、\n" + p2Pokemon.atkName[atkNo] + "　を　はなった！");
        await sleep_ms(1000);
        await _closeMessageBog();

        await _showCutIn(p2Pokemon.cutinImgUrl[atkNo]);

        //攻撃モーション
        anime({
            targets: "#player2Card",
            translateX: -130 + "%",
            duration: 250,
            easing: "easeInBack",
        });
        await sleep_ms(250);

        if (isAttackSuccess) {
            const damageAnime = anime({
                targets: "#player1Card",
                opacity: [0, 0.2, 1],
                duration: 150, // 点滅にかかる時間（ミリ秒）
                loop: true,
                easing: "steps(3)", // イージング関数
                iterations: Infinity, // 繰り返し回数（無限回）
            });

            //HPアニメーション
            const targetHp = { value: p1Hp.value };
            let damage = 0;
            if (atkNo == 0) {
                damage = Config.strongAttackPower;
            }
            if (atkNo == 1) {
                damage = Config.normalAttackPower;
            }
            if (atkNo == 2) {
                damage = Config.weakAttackPower;
            }
            anime({
                targets: targetHp,
                value: p1Hp.value - damage,
                duration: 2600,
                round: 1,
                easing: "linear",
                update: function () {
                    if (targetHp.value <= 0) {
                        p1Hp.value = 0;
                        return;
                    }
                    p1Hp.value = targetHp.value;
                },
            });

            _shakeStage(400);

            //攻撃モーションもどり
            anime({
                targets: "#player2Card",
                translateX: "0%",
                duration: 100,
                easing: "easeOutExpo",
            });
            await sleep_ms(100);

            await sleep_ms(500);

            await _openMessageBox();
            await _typeMessage("こうか　は　ばつぐん　だ！！！");
            await sleep_ms(1000);
            await _closeMessageBog();

            await sleep_ms(1000);

            damageAnime.pause();
            anime({
                targets: "#player1Card",
                duration: 0,
                opacity: 1,
            });

            await sleep_ms(400);

            if (p1Hp.value <= 0) {
                _onWin();
                return;
            }
        } else {
            await sleep_ms(400);

            // 味方の攻撃！（失敗する）
            anime({
                targets: "#player2Card",
                translateX: "0%",
                duration: 400,
                easing: "easeOutExpo",
            });
            await sleep_ms(400);

            await sleep_ms(1200);

            await _openMessageBox();
            await _typeMessage("こうげき　は　しっぱい　した．．．");
            await sleep_ms(1000);
            await _closeMessageBog();

            await sleep_ms(500);
        }

        // 敵の攻撃！
        await _openMessageBox();
        await _typeMessage(p1Pokemon.name + " は、\n" + p1Pokemon.atkName[1] + "　を　はなった！");
        await sleep_ms(1000);
        await _closeMessageBog();

        await sleep_ms(300);

        await _showCutIn(p1Pokemon.cutinImgUrl[1]);

        anime({
            targets: "#player1Card",
            translateX: 130 + "%",
            duration: 250,
            easing: "easeInBack",
        });
        await sleep_ms(250);

        const damageAnime = anime({
            targets: "#player2Card",
            opacity: [0, 0.2, 1],
            duration: 150, // 点滅にかかる時間（ミリ秒）
            loop: true,
            easing: "steps(3)", // イージング関数
            iterations: Infinity, // 繰り返し回数（無限回）
        });

        //HPアニメーション
        const targetHp = { value: p2Hp.value };
        anime({
            targets: targetHp,
            value: 0,
            duration: 2100,
            round: 1,
            easing: "linear",
            update: function () {
                p2Hp.value = targetHp.value;
            },
        });

        _shakeStage(600);

        anime({
            targets: "#player1Card",
            translateX: "0%",
            duration: 100,
            easing: "easeOutExpo",
        });
        await sleep_ms(100);

        await sleep_ms(2000);

        damageAnime.pause();
        anime({
            targets: "#player2Card",
            duration: 0,
            opacity: 1,
        });

        await sleep_ms(400);

        _onLose();
    };

    const _onWin = async () => {
        anime({
            targets: "#player1Card",
            translateY: "300%",
            rotate: "33deg",
            duration: 800, // 点滅にかかる時間（ミリ秒）
            easing: "easeInCubic", // イージング関数
        });
        await sleep_ms(800);

        await _openMessageBox();
        await _typeMessage(p2Pokemon.name + "　は　ショウリ　した！");
        await sleep_ms(1000);

        _onGameEnded("win");
    };

    const _onLose = async () => {
        anime({
            targets: "#player2Card",
            translateY: "300%",
            rotate: "33deg",
            duration: 800, // 点滅にかかる時間（ミリ秒）
            easing: "easeInCubic", // イージング関数
        });
        await sleep_ms(800);

        await _openMessageBox();
        await _typeMessage(p2Pokemon.name + "　は　ハイボク　した．．．");
        await sleep_ms(1000);

        _onGameEnded("lose");
    };

    const _onGameEnded = async (result: "win" | "lose") => {
        await sleep_ms(800);

        anime({
            targets: "#winLoseWrapper",
            opacity: 1,
            duration: 1300, // 点滅にかかる時間（ミリ秒）
            easing: "linear", // イージング関数
        });
        await sleep_ms(1300);

        if (result == "win") {
            anime({
                targets: "#win",
                top: "22%",
                duration: 1400,
                easing: "easeOutBounce",
            });
        } else {
            anime({
                targets: "#lose",
                top: "22%",
                duration: 1400,
                easing: "easeOutBounce",
            });
        }
    };

    // helpers
    const _calculateAttackScenario = (p1Pokemon: Pokemon, p2Pokemon: Pokemon) => {
        // 1.ピンチ状況の決定
        //1-a タイプ相性判定
        const typeCompatibility = getTypeCompatibility(p1Pokemon, p2Pokemon);
        console.log("タイプ相性：" + typeCompatibility);

        //  1-b ピンチ状況の決判定
        let pinchSituation = PinchSituation.Pinch;
        if (typeCompatibility == TypeCompatibility.Good) {
            if (p2Pokemon.rank <= 6) {
                pinchSituation = PinchSituation.Pinch;
            } else if (7 <= p2Pokemon.rank && p2Pokemon.rank <= 9) {
                pinchSituation = PinchSituation.ALittlePinch;
            } else {
                pinchSituation = PinchSituation.VeryPinch;
            }
        }

        if (typeCompatibility == TypeCompatibility.Normal) {
            if (p2Pokemon.rank <= 4) {
                pinchSituation = PinchSituation.Pinch;
            } else if (5 <= p2Pokemon.rank && p2Pokemon.rank <= 8) {
                pinchSituation = PinchSituation.ALittlePinch;
            } else {
                pinchSituation = PinchSituation.VeryPinch;
            }
        }

        if (typeCompatibility == TypeCompatibility.Bad) {
            if (p2Pokemon.rank <= 3) {
                pinchSituation = PinchSituation.Pinch;
            } else if (4 <= p2Pokemon.rank && p2Pokemon.rank <= 6) {
                pinchSituation = PinchSituation.ALittlePinch;
            } else {
                pinchSituation = PinchSituation.VeryPinch;
            }
        }

        console.log("ピンチの状況：" + pinchSituation);

        //味方HPが１単位になるまでにかかるターンを計算
        const necessaryTurn = Math.floor((p2Pokemon.hp - 100) / Config.enemyAttackPower);

        //適切な味方攻撃力を計算
        let p2AttackPower = 0;
        if (pinchSituation == PinchSituation.Pinch) {
            p2AttackPower = (p1Pokemon.hp - 100) / necessaryTurn;
        } else if (pinchSituation == PinchSituation.ALittlePinch) {
            p2AttackPower = (p1Pokemon.hp - 200) / necessaryTurn;
        } else if (pinchSituation == PinchSituation.VeryPinch) {
            p2AttackPower = (p1Pokemon.hp - 300) / necessaryTurn;
        }

        return { necessaryTurn, p2AttackPower };
    };

    const _getRandomBinary = (probability: number) => {
        return Math.random() < probability ? 1 : 0;
    };

    const _showCutIn = async (cutinImgName: string) => {
        _shakeStage(300);
        cutinImg.value = cutinImgName;
        isShowCutin.value = true;

        anime({
            targets: "#cutIn",
            duration: 100,
            clipPath: [
                "clip-path: polygon(0 39%, 100% 62%, 100% 62%, 0 39%)",
                "polygon(0 7%, 100% 23%, 100% 91%, 0 74%)",
            ],
            easing: "easeInQuint",
        });
        await sleep_ms(100);

        await sleep_ms(800);

        anime({
            targets: "#cutIn",
            duration: 100,
            clipPath: [
                "clip-path: polygon(0 7%, 100% 23%, 100% 91%, 0 74%)",
                "polygon(0 39%, 100% 62%, 100% 62%, 0 39%)",
            ],
            easing: "easeInQuint",
        });
        await sleep_ms(180);

        isShowCutin.value = false;
    };

    // const _onGameEnded = async (isP2Turn: boolean) => {
    //     anime({
    //         targets: isP2Turn ? "#player1Card" : "#player2Card",
    //         translateY: 9000,
    //         rotate: "33deg",
    //         duration: 800, // 点滅にかかる時間（ミリ秒）
    //         easing: "easeInCubic", // イージング関数
    //     });
    //     await sleep_ms(800);

    //     await _openMessageBox();
    //     await _typeMessage(
    //         isP2Turn ? p2Pokemon.name + "はショウリした！" : p2Pokemon.name + "はハイボクした…",
    //     );
    //     await sleep_ms(1000);
    //     await _closeMessageBog();

    //     anime({
    //         targets: "#winLoseWrapper",
    //         opacity: 0.6,
    //         duration: 1300, // 点滅にかかる時間（ミリ秒）
    //         easing: "linear", // イージング関数
    //     });
    //     await sleep_ms(1300);
    //     console.log("ok1");

    //     if (isP2Turn) {
    //         //
    //     } else {
    //         console.log("ok2");
    //         anime({
    //             targets: "#lose",
    //             top: "22%",
    //             duration: 1400,
    //             easing: "easeOutBounce",
    //         });
    //         console.log("ok3");
    //     }
    // };

    const _openMessageBox = async () => {
        anime({
            targets: "#messageBox",
            width: "90%",
            duration: 150,
            easing: "easeInQuint",
        });
        await sleep_ms(150);
    };

    const _closeMessageBog = async () => {
        messageText.value = "";

        anime({
            targets: "#messageBox",
            width: "0%",
            duration: 150,
            easing: "easeInQuint",
        });
        await sleep_ms(150);
    };

    const _typeMessage = async (text: string) => {
        for (let i = 0; i < text.length + 1; i++) {
            messageText.value = text.slice(0, i);
            await sleep_ms(40);
        }
    };

    const _shakeStage = async (duration: number) => {
        const animation = anime({
            targets: "#scene",
            duration: 80,
            loop: true,
            translateX: [0, 6, 0, 6, 0],
            translateY: [0, 6, 6, 0, 0],
        });

        await sleep_ms(duration);

        animation.pause();
    };

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
    };
});

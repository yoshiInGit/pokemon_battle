import anime from "animejs";
import type { Pokemon } from "../pokemon";
import { sleep_ms } from "@/helper";

export class Pikachu implements Pokemon{
    atk = [7000, 7000, 7000]
    atkName = ["じゅうまんボルト", "じゅうまんボルト", "じゅうまんボルト"];
    cutinImgUrl = ["/img/cutin/cutin.png", "/img/cutin/cutin.png", "/img/cutin/cutin.png"];
    name = "ピカチュウ"
    hp   = 7000
    cardImgUrl = "/img/card/pika.png";
    
    async onAttack({ no }: { no: number; }): Promise<void> {
        anime({
            targets : "#player2Card",
            duration: 200,
            rotate : "-10deg",
            scaleX : 1.4,
            scaleY : 1.4,
            easing : "easeOutQuart",
        })
        await sleep_ms(500);
    }

    async onAttacked({ no }: { no: number; }): Promise<void> {
        anime({
            targets : "#player2Card",
            duration: 500,
            rotate : "0deg",
            scaleX : 1,
            scaleY : 1,
            easing : "easeOutQuart",
        })
        await sleep_ms(500);
    }
}
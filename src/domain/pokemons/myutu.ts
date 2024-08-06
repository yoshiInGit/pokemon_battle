import type { Pokemon } from "../pokemon";
import cardImgUrlAsset from "@/assets/img/card/myu.png"

export class Myutu implements Pokemon{
    atkName = ["サイコカッター ", "サイコブレイク", "シャドーボール"];
    atk = [8500, 8500, 8500];
    cutinImgUrl = ["", "", ""];
    name = "ミューツー";
    hp   = 9000;
    cardImgUrl = cardImgUrlAsset;
    
    async onAttack({ no }: { no: number; }): Promise<void>  {
        
    }
    async onAttacked({ no }: { no: number; }): Promise<void> {
        
    }
}
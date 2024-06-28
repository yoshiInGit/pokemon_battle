import type { Pokemon } from "../pokemon";

export class Myutu implements Pokemon{
    atk = [8500, 8500, 8500];
    cutinImgUrl = ["", "", ""];
    name = "ミューツー";
    hp   = 9000;
    cardImgUrl = "/img/card/myu.png";
    
    onAttack({ no }: { no: number; }): Promise<void> {
        throw new Error("Method not implemented.");
    }
    onAttacked({ no }: { no: number; }): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
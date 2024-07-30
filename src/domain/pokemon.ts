export interface Pokemon{
    name       : string;
    hp         : number;
    atk : number[];
    atkName : string[];
    cardImgUrl : string;
    cutinImgUrl : string[];

    onAttack({no} : {no : number}) : Promise<void>;
    onAttacked({no} : {no : number}) : Promise<void>;
}
import type { Pokemon } from "../pokemon";
import cardImgUrlAsset from "@/assets/img/card/myu.png";
import { PokemonType } from "../pokemonType";

export class Myutu implements Pokemon {
  name = "ミューツー";
  hp = 900;
  typeName = PokemonType.Espa;
  rank = 1;

  atkName = ["サイコカッター ", "サイコブレイク", "シャドーボール"];
  cutinImgUrl = ["", "", ""];
  cardImgUrl = cardImgUrlAsset;
}

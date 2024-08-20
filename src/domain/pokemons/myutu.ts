import CutinImgAsset from "@/assets/img/cutin/cutin.png";
import cardImgUrlAsset from "@/assets/img/card/myu.png";
import { PokemonType } from "../pokemonType";
import { GymPokemon } from "./gym";

export class Myutu extends GymPokemon {
  name = "ミューツー";
  hp = 900;
  typeName = PokemonType.Espa;
  rank = 1;

  atkNames = "サイコカッター";
  cutinImgUrl = CutinImgAsset;
  cardImgUrl = cardImgUrlAsset;
}

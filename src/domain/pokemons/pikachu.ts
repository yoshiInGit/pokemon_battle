import type { Pokemon } from "../pokemon";
import CutinImgAsset from "@/assets/img/cutin/cutin.png";
import cardImgUrlAsset from "@/assets/img/card/pika.png";
import { PokemonType } from "../pokemonType";

export class Pikachu implements Pokemon {
  name = "ピカチュウ";
  hp = 700;
  typeName = PokemonType.Denki;
  rank = 1;

  atkName = ["じゅうまんボルト", "じゅうまんボルト", "じゅうまんボルト"];
  cutinImgUrl = [CutinImgAsset, CutinImgAsset, CutinImgAsset];
  cardImgUrl = cardImgUrlAsset;
}

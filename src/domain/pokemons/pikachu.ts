import type { Pokemon } from "../pokemon";
import CutinImgAsset from "@/assets/img/cutin/cutin.png";
import cardImgUrlAsset from "@/assets/img/card/pika.png";
import { PokemonType } from "../pokemonType";

export class Pikachu implements Pokemon {
  name = "ピカチュウ";
  hp = 700;
  typeName = PokemonType.Denki;
  rank = 1;

  atkNames: [string, string, string] = ["じゅうまんボルト", "じゅうまんボルト", "じゅうまんボルト"];
  cutinImgUrl: [string, string] = [CutinImgAsset, CutinImgAsset];
  cardImgUrl = cardImgUrlAsset;
}

import ReshiramAsset from "@/assets/img/entry/01.png";
import ReshiramInfoAsset from "@/assets/img/entry/01-info.png";
import KapuKokekoAsset from "@/assets/img/entry/02.png";
import KapuKokekoInfoAsset from "@/assets/img/entry/02-info.png";
import DeoxysAsset from "@/assets/img/entry/03.png";
import DeoxysInfoAsset from "@/assets/img/entry/03-info.png";
import GabrielusAsset from "@/assets/img/entry/04.png";
import GabrielusInfoAsset from "@/assets/img/entry/04-info.png";
import GreninjakoAsset from "@/assets/img/entry/05.png";
import GreninjakoInfoAsset from "@/assets/img/entry/05-info.png";
import ReshiramCardAsset from "@/assets/img/card/gym-01.png";
import KapuKokekoCardAsset from "@/assets/img/card/gym-02.png";
import DeoxysCardAsset from "@/assets/img/card/gym-03.png";
import GabrielusCardAsset from "@/assets/img/card/gym-04.png";
import GreninjakoCardAsset from "@/assets/img/card/gym-05.png";
import CutinImgAsset from "@/assets/img/cutin/cutin.png";
import { PokemonType } from "./pokemonType";
import type { GymPokemon } from "./pokemons/gym";

export const StageAssets = {
  "01": {
    src: ReshiramAsset,
    status: ReshiramInfoAsset,
    location: "体育館",
    leaderName: "N",
    pokemonName: "レシラム",
    hp: 300,
    type: PokemonType.Hono,
    rank: 1,
    atkName: "" as GymPokemon["atkName"],
    cardSrc: ReshiramCardAsset,
    cutinImgSrc: CutinImgAsset,
  },
  "02": {
    src: KapuKokekoAsset,
    status: KapuKokekoInfoAsset,
    location: "講堂",
    leaderName: "ククイ博士",
    pokemonName: "カプ・コケコ",
    hp: 300,
    type: PokemonType.Hono,
    rank: 1,
    atkName: "" as GymPokemon["atkName"],
    cardSrc: KapuKokekoCardAsset,
    cutinImgSrc: CutinImgAsset,
  },
  "03": {
    src: DeoxysAsset,
    status: DeoxysInfoAsset,
    location: "第一キャンプ場",
    leaderName: "ダイゴ",
    pokemonName: "デオキシス",
    hp: 300,
    type: PokemonType.Hono,
    rank: 1,
    atkName: "" as GymPokemon["atkName"],
    cardSrc: DeoxysCardAsset,
    cutinImgSrc: CutinImgAsset,
  },
  "04": {
    src: GabrielusAsset,
    status: GabrielusInfoAsset,
    location: "宿舎前広場",
    leaderName: "シロナ",
    pokemonName: "ガブリアス",
    hp: 300,
    type: PokemonType.Hono,
    rank: 1,
    atkName: "" as GymPokemon["atkName"],
    cardSrc: GabrielusCardAsset,
    cutinImgSrc: CutinImgAsset,
  },
  "05": {
    src: GreninjakoAsset,
    status: GreninjakoInfoAsset,
    location: "冒険の小川",
    leaderName: "サトシ",
    pokemonName: "ゲッコウガ",
    hp: 300,
    type: PokemonType.Hono,
    rank: 1,
    atkName: "" as GymPokemon["atkName"],
    cardSrc: GreninjakoCardAsset,
    cutinImgSrc: CutinImgAsset,
  },
} as const;

export type GymKeys = keyof typeof StageAssets;

export const isGym = (data: unknown): data is GymKeys => {
  return typeof data === "string" && Object.prototype.hasOwnProperty.call(StageAssets, data);
};

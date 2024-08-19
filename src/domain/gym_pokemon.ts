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

export const StageAssets = {
  "01": {
    src: ReshiramAsset,
    status: ReshiramInfoAsset,
    location: "体育館",
    leaderName: "N",
    pokemonName: "レシラム",
  },
  "02": {
    src: KapuKokekoAsset,
    status: KapuKokekoInfoAsset,
    location: "講堂",
    leaderName: "ククイ博士",
    pokemonName: "カプ・コケコ",
  },
  "03": {
    src: DeoxysAsset,
    status: DeoxysInfoAsset,
    location: "第一キャンプ場",
    leaderName: "ダイゴ",
    pokemonName: "デオキシス",
  },
  "04": {
    src: GabrielusAsset,
    status: GabrielusInfoAsset,
    location: "宿舎前広場",
    leaderName: "シロナ",
    pokemonName: "ガブリアス",
  },
  "05": {
    src: GreninjakoAsset,
    status: GreninjakoInfoAsset,
    location: "冒険の小川",
    leaderName: "サトシ",
    pokemonName: "ゲッコウガ",
  },
} as const;

export type Gym = keyof typeof StageAssets;

export const isGym = (data: unknown): data is Gym => {
  return typeof data === "string" && Object.prototype.hasOwnProperty.call(StageAssets, data);
};

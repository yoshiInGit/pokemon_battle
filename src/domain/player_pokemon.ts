import Player01CardAsset from "@/assets/img/card/player-01.png";
import Player02CardAsset from "@/assets/img/card/player-02.png";
import Player03CardAsset from "@/assets/img/card/player-03.png";
import Player04CardAsset from "@/assets/img/card/player-04.png";
import Player05CardAsset from "@/assets/img/card/player-05.png";
import Player06CardAsset from "@/assets/img/card/player-06.png";
import Player07CardAsset from "@/assets/img/card/player-07.png";
import Player08CardAsset from "@/assets/img/card/player-08.png";
import CutinImgAsset from "@/assets/img/cutin/cutin.png";
import { PokemonType } from "./pokemonType";
import type { Pokemon } from "./pokemon";

export const PlayerOptions = {
  "01": {
    src: Player01CardAsset,
    name: "ミロカロス",
    hp: 700,
    type: PokemonType.Hono,
    rank: 1,
    atkNames: ["atk01", "atk02", "atk03"] as Pokemon["atkNames"],
    cutinImgUrl: [CutinImgAsset, CutinImgAsset] as Pokemon["cutinImgUrl"],
    cardImgUrl: "",
  },
  "02": {
    src: Player02CardAsset,
    name: "シャリタツ",
    hp: 700,
    type: PokemonType.Hono,
    rank: 1,
    atkNames: ["atk01", "atk02", "atk03"] as Pokemon["atkNames"],
    cutinImgUrl: [CutinImgAsset, CutinImgAsset] as Pokemon["cutinImgUrl"],
    cardImgUrl: "",
  },
  "03": {
    src: Player03CardAsset,
    name: "マニューラ",
    hp: 700,
    type: PokemonType.Hono,
    rank: 1,
    atkNames: ["atk01", "atk02", "atk03"] as Pokemon["atkNames"],
    cutinImgUrl: [CutinImgAsset, CutinImgAsset] as Pokemon["cutinImgUrl"],
    cardImgUrl: "",
  },
  "04": {
    src: Player04CardAsset,
    name: "オノノクス",
    hp: 700,
    type: PokemonType.Hono,
    rank: 1,
    atkNames: ["atk01", "atk02", "atk03"] as Pokemon["atkNames"],
    cutinImgUrl: [CutinImgAsset, CutinImgAsset] as Pokemon["cutinImgUrl"],
    cardImgUrl: "",
  },
  "05": {
    src: Player05CardAsset,
    name: "ルガルガン",
    hp: 700,
    type: PokemonType.Hono,
    rank: 1,
    atkNames: ["atk01", "atk02", "atk03"] as Pokemon["atkNames"],
    cutinImgUrl: [CutinImgAsset, CutinImgAsset] as Pokemon["cutinImgUrl"],
    cardImgUrl: "",
  },
  "06": {
    src: Player06CardAsset,
    name: "イワーク",
    hp: 700,
    type: PokemonType.Hono,
    rank: 1,
    atkNames: ["atk01", "atk02", "atk03"] as Pokemon["atkNames"],
    cutinImgUrl: [CutinImgAsset, CutinImgAsset] as Pokemon["cutinImgUrl"],
    cardImgUrl: "",
  },
  "07": {
    src: Player07CardAsset,
    name: "リーフィア",
    hp: 700,
    type: PokemonType.Hono,
    rank: 1,
    atkNames: ["atk01", "atk02", "atk03"] as Pokemon["atkNames"],
    cutinImgUrl: [CutinImgAsset, CutinImgAsset] as Pokemon["cutinImgUrl"],
    cardImgUrl: "",
  },
  "08": {
    src: Player08CardAsset,
    name: "デデンネ",
    hp: 700,
    type: PokemonType.Hono,
    rank: 1,
    atkNames: ["atk01", "atk02", "atk03"] as Pokemon["atkNames"],
    cutinImgUrl: [CutinImgAsset, CutinImgAsset] as Pokemon["cutinImgUrl"],
    cardImgUrl: "",
  },
};

export type PlayerKeys = keyof typeof PlayerOptions;

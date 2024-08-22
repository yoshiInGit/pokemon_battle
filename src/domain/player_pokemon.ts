import Player01CardAsset from "@/assets/img/card/player-01.png";
import Player02CardAsset from "@/assets/img/card/player-02.png";
import Player03CardAsset from "@/assets/img/card/player-03.png";
import Player04CardAsset from "@/assets/img/card/player-04.png";
import Player05CardAsset from "@/assets/img/card/player-05.png";
import Player06CardAsset from "@/assets/img/card/player-06.png";
import Player07CardAsset from "@/assets/img/card/player-07.png";
import Player08CardAsset from "@/assets/img/card/player-08.png";
import Player08CutinVideoAsset from "@/assets/cutin-video/08.mp4";
import Player01Cutin01Asset from "@/assets/img/cutin/ミロカロス/みずてっぽう.png";
import Player01Cutin02Asset from "@/assets/img/cutin/ミロカロス/なみのり.png";
import Player02Cutin01Asset from "@/assets/img/cutin/シャリタツ/ドラゴンテール.png";
import Player02Cutin02Asset from "@/assets/img/cutin/シャリタツ/りゅうのはどう.png";
import Player03Cutin01Asset from "@/assets/img/cutin/マニューラ/だめおし.png";
import Player03Cutin02Asset from "@/assets/img/cutin/マニューラ/つじぎり.png";
import Player04Cutin01Asset from "@/assets/img/cutin/オノノクス/ドラゴンテール.png";
import Player04Cutin02Asset from "@/assets/img/cutin/オノノクス/りゅのはどう.png";
import Player05Cutin01Asset from "@/assets/img/cutin/ルガルガン/アクセルロック.png";
import Player05Cutin02Asset from "@/assets/img/cutin/ルガルガン/いわなだれ.png";
import Player06Cutin01Asset from "@/assets/img/cutin/イワーク/いわおとし.png";
import Player06Cutin02Asset from "@/assets/img/cutin/イワーク/いわなだれ.png";
import Player07Cutin01Asset from "@/assets/img/cutin/リーフィア/はっぱカッター.png";
import Player07Cutin02Asset from "@/assets/img/cutin/リーフィア/マジカルリーフ.png";
import Player08Cutin01Asset from "@/assets/img/cutin/デデンネ/ほっぺすりすり.png";
import Player08Cutin02Asset from "@/assets/img/cutin/デデンネ/でんきショック.png";

import { PokemonType } from "./pokemonType";
import type { Player } from "./pokemons/player";

export const PlayerOptions = {
  "01": {
    src: Player01CardAsset,
    name: "ミロカロス",
    hp: 700,
    type: PokemonType.Hono,
    rank: 1,
    atkNames: ["atk01", "atk02", "atk03"] as Player["atkNames"],
    cutinVideoAsset: Player08CutinVideoAsset,
  },
  "02": {
    src: Player02CardAsset,
    name: "シャリタツ",
    hp: 700,
    type: PokemonType.Hono,
    rank: 1,
    atkNames: ["atk01", "atk02", "atk03"] as Player["atkNames"],
    cutinVideoAsset: Player08CutinVideoAsset,
  },
  "03": {
    src: Player03CardAsset,
    name: "マニューラ",
    hp: 700,
    type: PokemonType.Hono,
    rank: 1,
    atkNames: ["atk01", "atk02", "atk03"] as Player["atkNames"],
    cutinVideoAsset: Player08CutinVideoAsset,
  },
  "04": {
    src: Player04CardAsset,
    name: "オノノクス",
    hp: 700,
    type: PokemonType.Hono,
    rank: 1,
    atkNames: ["atk01", "atk02", "atk03"] as Player["atkNames"],
    cutinVideoAsset: Player08CutinVideoAsset,
  },
  "05": {
    src: Player05CardAsset,
    name: "ルガルガン",
    hp: 700,
    type: PokemonType.Hono,
    rank: 1,
    atkNames: ["atk01", "atk02", "atk03"] as Player["atkNames"],
    cutinVideoAsset: Player08CutinVideoAsset,
  },
  "06": {
    src: Player06CardAsset,
    name: "イワーク",
    hp: 700,
    type: PokemonType.Hono,
    rank: 1,
    atkNames: ["atk01", "atk02", "atk03"] as Player["atkNames"],
    cutinVideoAsset: Player08CutinVideoAsset,
  },
  "07": {
    src: Player07CardAsset,
    name: "リーフィア",
    hp: 700,
    type: PokemonType.Hono,
    rank: 1,
    atkNames: ["atk01", "atk02", "atk03"] as Player["atkNames"],
    cutinVideoAsset: Player08CutinVideoAsset,
  },
  "08": {
    src: Player08CardAsset,
    name: "デデンネ",
    hp: 700,
    type: PokemonType.Hono,
    rank: 1,
    atkNames: ["atk01", "atk02", "atk03"] as Player["atkNames"],
    cutinVideoAsset: Player08CutinVideoAsset,
  },
};

export type PlayerKeys = keyof typeof PlayerOptions;

export const CutinImgAssets: Record<PlayerKeys, Player["cutinImgUrl"]> = {
  "01": [Player01Cutin01Asset, Player01Cutin02Asset],
  "02": [Player02Cutin01Asset, Player02Cutin02Asset],
  "03": [Player03Cutin01Asset, Player03Cutin02Asset],
  "04": [Player04Cutin01Asset, Player04Cutin02Asset],
  "05": [Player05Cutin01Asset, Player05Cutin02Asset],
  "06": [Player06Cutin01Asset, Player06Cutin02Asset],
  "07": [Player07Cutin01Asset, Player07Cutin02Asset],
  "08": [Player08Cutin01Asset, Player08Cutin02Asset],
};

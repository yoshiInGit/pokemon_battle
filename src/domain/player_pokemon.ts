import Player01CardAsset from "@/assets/img/card/player-01.png";
import Player02CardAsset from "@/assets/img/card/player-02.png";
import Player03CardAsset from "@/assets/img/card/player-03.png";
import Player04CardAsset from "@/assets/img/card/player-04.png";
import Player05CardAsset from "@/assets/img/card/player-05.png";
import Player06CardAsset from "@/assets/img/card/player-06.png";
import Player07CardAsset from "@/assets/img/card/player-07.png";
import Player08CardAsset from "@/assets/img/card/player-08.png";

export const PlayerOptions = {
  "01": {
    src: Player01CardAsset,
    name: "ミロカロス",
  },
  "02": {
    src: Player02CardAsset,
    name: "シャリタツ",
  },
  "03": {
    src: Player03CardAsset,
    name: "マニューラ",
  },
  "04": {
    src: Player04CardAsset,
    name: "オノノクス",
  },
  "05": {
    src: Player05CardAsset,
    name: "ルガルガン",
  },
  "06": {
    src: Player06CardAsset,
    name: "イワーク",
  },
  "07": {
    src: Player07CardAsset,
    name: "リーフィア",
  },
  "08": {
    src: Player08CardAsset,
    name: "デデンネ",
  },
};

export type PlayerKeys = keyof typeof PlayerOptions;

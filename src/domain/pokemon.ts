import type { PokemonType } from "./pokemonType";

export interface Pokemon {
  key: string;
  name: string;

  hp: number;
  typeName: PokemonType;
  rank: number;
}

export const GymKeys = {
  Reshiram: "01",
  KapuKokeko: "02",
  Deoxys: "03",
  Gaburias: "04",
  Gekkouga: "05",
};

export const PlayerKeys = {
  Milokaross: "01",
  Syaritatsu: "02",
  Manyula: "03",
  Ononokus: "04",
  Lugarugan: "05",
  Iwark: "06",
  Leafia: "07",
  Dedenne: "08",
};

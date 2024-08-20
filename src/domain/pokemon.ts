import type { PokemonType } from "./pokemonType";

export interface Pokemon {
  name: string;

  hp: number;
  typeName: PokemonType;
  rank: number;

  atkNames: [string, string, string];
  cutinImgUrl: [string, string];
  cardImgUrl: string;
}

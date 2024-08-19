import type { PokemonType } from "./pokemonType";

export interface Pokemon {
  name: string;

  hp: number;
  typeName: PokemonType;
  rank: number;

  atkName: string[];
  cutinImgUrl: string[];
  cardImgUrl: string;
}

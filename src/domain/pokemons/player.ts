import type { Pokemon } from "../pokemon";
import { PokemonType } from "../pokemonType";

export class Player implements Pokemon {
  constructor(
    public name: string,
    public hp: number,
    public typeName: PokemonType,
    public rank: number,
    public atkNames: [string, string, string],
    public cutinImgUrl: [string, string],
    public cardImgUrl: string,
  ) {}
}

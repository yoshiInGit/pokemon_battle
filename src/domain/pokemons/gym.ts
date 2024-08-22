import type { Pokemon } from "../pokemon";
import { PokemonType } from "../pokemonType";

export class GymPokemon implements Pokemon {
  constructor(
    public key: string = "",
    public name: string = "",
    public hp: number = 0,
    public typeName: PokemonType = PokemonType.Hono,
    public rank: number = 0,
    public atkName: string = "",
    public cutinImgUrl: string = "",
    public cardImgUrl: string = "",
  ) {}
}

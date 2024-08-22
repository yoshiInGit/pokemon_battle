import type { Pokemon } from "../pokemon";
import { PokemonType } from "../pokemonType";

export class Player implements Pokemon {
  constructor(
    public key: string = "",
    public name: string = "",
    public hp: number = 0,
    public typeName: PokemonType = PokemonType.Hono,
    public rank: number = 0,
    public atkNames: [string, string, string] = ["", "", ""],
    public cutinImgUrl: [string, string] = ["", ""],
    public cardImgUrl: string = "",
    public cutinVideoUrl: string = "",
  ) {}
}

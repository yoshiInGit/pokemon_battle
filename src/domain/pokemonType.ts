import type { Pokemon } from "./pokemon";

export enum PokemonType {
  Hono,
  Mizu,
  Kusa,
  Espa,
  Denki,
  Doragon,
  Hagane,
  Aku,
  Iwa,
  Kakuto,
  Hiko,
  Normal,
}

export enum TypeCompatibility {
  Good,
  Normal,
  Bad,
}

export const getTypeCompatibility = (p1Pokemon: Pokemon, p2Pokemon: Pokemon) => {
  const goodAgainst: { [key in PokemonType]?: PokemonType[] } = {
    [PokemonType.Hono]: [PokemonType.Hagane, PokemonType.Kusa],
    [PokemonType.Mizu]: [PokemonType.Hono, PokemonType.Iwa],
    [PokemonType.Kusa]: [PokemonType.Mizu, PokemonType.Iwa],
    [PokemonType.Espa]: [PokemonType.Kakuto],
    [PokemonType.Denki]: [PokemonType.Mizu, PokemonType.Hiko],
    [PokemonType.Doragon]: [PokemonType.Doragon],
    [PokemonType.Hagane]: [PokemonType.Iwa],
    [PokemonType.Aku]: [PokemonType.Espa],
    [PokemonType.Iwa]: [PokemonType.Hono, PokemonType.Hiko],
    [PokemonType.Kakuto]: [PokemonType.Normal, PokemonType.Iwa, PokemonType.Aku, PokemonType.Hagane],
    [PokemonType.Hiko]: [PokemonType.Kusa, PokemonType.Kakuto],
  };

  const badAgainst: { [key in PokemonType]?: PokemonType[] } = {
    [PokemonType.Hono]: [PokemonType.Mizu, PokemonType.Iwa, PokemonType.Doragon],
    [PokemonType.Mizu]: [PokemonType.Kusa, PokemonType.Doragon],
    [PokemonType.Kusa]: [PokemonType.Hono, PokemonType.Hiko, PokemonType.Doragon, PokemonType.Hagane],
    [PokemonType.Espa]: [PokemonType.Hagane],
    [PokemonType.Denki]: [PokemonType.Kusa, PokemonType.Doragon],
    [PokemonType.Doragon]: [PokemonType.Hagane],
    [PokemonType.Hagane]: [PokemonType.Hono, PokemonType.Mizu, PokemonType.Denki],
    [PokemonType.Aku]: [PokemonType.Kakuto],
    [PokemonType.Iwa]: [PokemonType.Kakuto, PokemonType.Hagane],
    [PokemonType.Kakuto]: [PokemonType.Hiko, PokemonType.Espa],
    [PokemonType.Hiko]: [PokemonType.Denki, PokemonType.Iwa, PokemonType.Hagane],
    [PokemonType.Normal]: [PokemonType.Iwa, PokemonType.Hagane],
  };

  if (goodAgainst[p2Pokemon.typeName]?.includes(p1Pokemon.typeName)) {
    return TypeCompatibility.Good;
  } else if (badAgainst[p2Pokemon.typeName]?.includes(p2Pokemon.typeName)) {
    return TypeCompatibility.Bad;
  } else {
    return TypeCompatibility.Normal;
  }
};

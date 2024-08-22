import { GymKeys, PlayerKeys, type Pokemon } from "./pokemon";

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

export const getPokemonCompatibility = (p1Pokemon: Pokemon, p2Pokemon: Pokemon) => {
  const goodAgainst: {
    [index in (typeof PlayerKeys)[keyof typeof PlayerKeys]]: Array<(typeof GymKeys)[keyof typeof GymKeys]>;
  } = {
    [PlayerKeys.Milokaross]: [GymKeys.Reshiram],
    [PlayerKeys.Syaritatsu]: [GymKeys.Gaburias],
    [PlayerKeys.Manyula]: [GymKeys.Deoxys],
    [PlayerKeys.Ononokus]: [GymKeys.Gaburias],
    [PlayerKeys.Lugarugan]: [GymKeys.KapuKokeko, GymKeys.Reshiram],
    [PlayerKeys.Iwark]: [GymKeys.KapuKokeko, GymKeys.Reshiram],
    [PlayerKeys.Leafia]: [GymKeys.Gekkouga],
    [PlayerKeys.Dedenne]: [GymKeys.Gekkouga],
  } as const;

  const badAgainst: {
    [index in (typeof GymKeys)[keyof typeof GymKeys]]: Array<(typeof PlayerKeys)[keyof typeof PlayerKeys]>;
  } = {
    [GymKeys.KapuKokeko]: [PlayerKeys.Manyula, PlayerKeys.Milokaross],
    [GymKeys.Reshiram]: [PlayerKeys.Leafia],
    [GymKeys.Gekkouga]: [PlayerKeys.Lugarugan, PlayerKeys.Iwark],
    [GymKeys.Deoxys]: [PlayerKeys.Ononokus, PlayerKeys.Syaritatsu],
    [GymKeys.Gaburias]: [PlayerKeys.Milokaross, PlayerKeys.Leafia, PlayerKeys.Dedenne],
  } as const;

  if (goodAgainst[p2Pokemon.key]?.includes(p1Pokemon.key)) {
    return TypeCompatibility.Good;
  } else if (badAgainst[p2Pokemon.key]?.includes(p2Pokemon.key)) {
    return TypeCompatibility.Bad;
  } else {
    return TypeCompatibility.Normal;
  }
};

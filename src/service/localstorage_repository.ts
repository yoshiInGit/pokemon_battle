import type { GymKeys } from "@/domain/gym_pokemon";

interface Props {
  "gym-selection": GymKeys;
}

export const setLocalStorageItem = <Key extends keyof Props, Value extends Props[Key]>(key: Key, value: Value) => {
  localStorage.setItem(key, value);
};

export const getLocalStorageItem = <Key extends keyof Props, Value extends Props[Key]>(key: Key): Value | null => {
  return localStorage.getItem(key) as Value | null;
};

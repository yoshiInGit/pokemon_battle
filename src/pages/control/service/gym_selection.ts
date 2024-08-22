import { isGym, type GymKeysType } from "@/domain/gym_pokemon";
import { setLocalStorageItem } from "@/service/localstorage_repository";
import { postMessage } from "@/service/message_listener";
import { ref } from "vue";

export const useGymSelection = () => {
  const selection = ref<GymKeysType>("01");

  const savedSelection = localStorage.getItem("gym-selection");
  if (savedSelection !== null && isGym(savedSelection)) {
    selection.value = savedSelection;
  } else {
    setLocalStorageItem("gym-selection", "01");
  }

  const setSelection = (key: GymKeysType) => {
    selection.value = key;
    setLocalStorageItem("gym-selection", key);
    postMessage("gym-selection", { key });
  };

  return {
    selection,
    setSelection,
  };
};

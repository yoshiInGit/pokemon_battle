import { isGym, type Gym } from "@/domain/gym_pokemon";
import { ref } from "vue";

export const useGymSelection = () => {
  const selection = ref<Gym>("01");

  const savedSelection = localStorage.getItem("gym-selection");
  if (savedSelection !== null && isGym(savedSelection)) {
    selection.value = savedSelection;
  } else {
    localStorage.setItem("gym-selection", "01");
  }

  return {
    selection,
  };
};

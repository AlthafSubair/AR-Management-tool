import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useListStore = create(
  persist(
    (set) => ({
      // Initial state
      appointmentTypeDtoList: [],
      locationDtoList: [],
      payorDtoList: [],
      providerDtoList: [],

      // Setter for all lists
      setList: ({ appointmentTypeDtoList, locationDtoList, payorDtoList, providerDtoList }) =>
        set({ appointmentTypeDtoList, locationDtoList, payorDtoList, providerDtoList }),

      // Optional: Reset method
      reset: () => set({
        appointmentTypeDtoList: [],
        locationDtoList: [],
        payorDtoList: [],
        providerDtoList: []
      }),
    }),
    {
      name: "list-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useListStore;

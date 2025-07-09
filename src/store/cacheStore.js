import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useCacheStore = create(
  persist(
    (set) => ({

      // intialiazing store variables

      clinics: [],
      status: [],

      // store actions

      setCache: (clinics, status) => set({ clinics, status }),
    }),

    // alloting localstorage for persistant data

    {
      name: 'cache-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCacheStore;

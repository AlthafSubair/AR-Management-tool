import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import useFilterFormStore from "./filterFormStore";

const useTableStore = create(
  persist(
    (set) => ({

      // intialiazing store variables

      results: [],
      totalRecords: 0,
      start: 0,
      limit: useFilterFormStore.getState().limit || 25,

        // store actions

      setResults: (payload) => {
        set({
          results: payload.results || [],
          totalRecords: payload.totalRecords || 0,
          start: payload.start || 0,
          limit: useFilterFormStore.getState().limit || 25,
        });
      },

      clearResults: () => {
        set({ results: [], totalRecords: 0, start: 0 });
      },

    }),

    // allocating storage
    
    {
      name: 'table-storage',
      storage: createJSONStorage(() => localStorage), // ✅ COMMA here, not semicolon
    }
  )
);

export default useTableStore;

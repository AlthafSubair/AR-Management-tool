import { create } from "zustand";


const useCheckBoxStore = create((set) => ({

    // intialiazing store variables
   
    selectedIds: new Set(),

    toggleId: (id) => 
        set(state => {

            // set for storing ids of selected rows
            const newSet = new Set(state.selectedIds)

            if(newSet.has(id)){
                newSet.delete(id); // if the id already in set delete it
            }else{
                newSet.add(id); // if the id not present in set add to set
            }
            return {selectedIds : newSet}
        }),

          // store actions

        clearAll: () => 
            set({selectedIds: new Set()}),

        selectAll: (ids) => 
            set({selectedIds: new Set(ids)})
    
}))

export default useCheckBoxStore;
import { create } from "zustand";


const useSummaryStore = create((set) =>({
    details: {},
    setDetails: (detail) => 
        set({
            details : detail || {}
        })
}))

export default useSummaryStore;
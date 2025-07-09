
import { create } from "zustand"

const getToday = () => new Date().toISOString().split('T')[0];


const useFilterFormStore = create((set) => ({
    form: {
        clinicId: null,
        providerId: null,
        statusId: null,
        ownerId: null,
        payorId: null,
        patientId: null,
        startDate: getToday(),
        endDate : getToday(),
        dueDate: null,
        start: 0,
        limit: 25
    },
     setField: (field, value) =>
    set((state) => ({
      form: { ...state.form, [field]: value },
    })),
}))

export default useFilterFormStore
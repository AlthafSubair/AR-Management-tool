import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


const useAuthStore = create(
    persist(
        (set) => ({

            // intialiazing store variables

            userId: null,
            fullName: null,
            clinicId: null,
            roles: [],
            accessToken: null,
            refreshToken: null,

            // store actions

            setLogin: ({userId, fullName, clinicId, roles, accessToken, refreshToken}) => 
                set({userId, fullName, clinicId, roles, accessToken, refreshToken}),
            setLogout: () => 
                set({ userId: null, fullName: null, clinicId: null, roles: [], accessToken: null, refreshToken: null })
        }),

        // alloting localstorage for persistant data
        
        {
            name: "auth-storage",
             storage: createJSONStorage(() => localStorage),
        }
    )
)

export default useAuthStore;
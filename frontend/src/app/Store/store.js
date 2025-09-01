import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserstate = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage", // key in localStorage
      getStorage: () => localStorage, // (optional) can also use sessionStorage
    }
  )
);

export default useUserstate;

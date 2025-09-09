import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCart = create(
    persist(
        (set) => ({
            items: [],
            setProducts: (products) => set({ items: products }),
            clearProducts: () => set({ items: [] }),
        }),
        {
            name: "cart-storage",
            getStorage: () => localStorage,
        }
    )
);
export default useCart;
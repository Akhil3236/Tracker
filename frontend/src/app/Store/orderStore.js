import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useOrders = create(
    persist(
        (set) => ({
            items: [],
            setorders: (orders) => set({ items: orders }),
            clearorders: () => set({ items: [] }),
        }),
        {
            name: "order-storage",
            getStorage: () => localStorage,
        }
    )
);
export default useOrders;
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useProduct = create(
  persist(
    (set) => ({
      product: [], // better to start with [] instead of null
      setProduct: (productData) => set({ product: productData }),
      clearProduct: () => set({ product: [] }),
    }),
    {
      name: "product-storage", // key in localStorage
      getStorage: () => localStorage, 
    }
  )
);

export default useProduct;

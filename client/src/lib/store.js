import { create } from 'zustand';

// Define store shape in plain JavaScript
export const useApp = create((set) => ({
  selectedStore: '',
  setStore: (storeId) => set({ selectedStore: storeId }),

  cart: [],

  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((c) => c.itemId === item.itemId);
      if (existing) {
        return {
          cart: state.cart.map((c) =>
            c.itemId === item.itemId
              ? { ...c, qty: c.qty + item.qty }
              : c
          ),
        };
      }
      return { cart: [...state.cart, item] };
    }),

  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((c) => c.itemId !== itemId),
    })),

  clearCart: () => set({ cart: [] }),
}));

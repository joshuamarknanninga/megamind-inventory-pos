import { create } from 'zustand';

type CartItem = { itemId:string; name:string; price:number; qty:number };
interface AppState {
  selectedStore?: string;
  setStore: (id:string)=>void;
  cart: CartItem[];
  addToCart: (ci:CartItem)=>void;
  removeFromCart: (itemId:string)=>void;
  clearCart: ()=>void;
}

export const useApp = create<AppState>((set,get)=>({
  selectedStore: undefined,
  setStore: (id) => set({ selectedStore: id }),
  cart: [],
  addToCart: (ci) => {
    const cart = [...get().cart];
    const idx = cart.findIndex(c => c.itemId===ci.itemId);
    if (idx>=0) cart[idx].qty += ci.qty; else cart.push(ci);
    set({ cart });
  },
  removeFromCart: (id) => set({ cart: get().cart.filter(c=>c.itemId!==id) }),
  clearCart: () => set({ cart: [] })
}));

import { create } from 'zustand';

const useStockStore = create((set) => ({//
  stockSeleccionado: null, 
  setStockSeleccionado: (stock) => set({ stockSeleccionado: stock }),
  clearStockSeleccionado: () => set({ stockSeleccionado: null }),

  isRegistroModalOpen: false, // Estado para el modal de registro
  openRegistroModal: () => set({ isRegistroModalOpen: true }),
  closeRegistroModal: () => set({ isRegistroModalOpen: false })
}));

export default useStockStore;

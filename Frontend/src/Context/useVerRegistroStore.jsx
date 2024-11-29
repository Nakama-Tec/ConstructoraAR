import { create } from 'zustand';

const useVerRegistroStore = create((set) => ({
  verRegistroSeleccionado: null, 
  setVerRegistroSeleccionado: (registro) => set({ verRegistroSeleccionado: registro }),
  clearVerRegistroSeleccionado: () => set({ verRegistroSeleccionado: null }),

  isVerRegistroModalOpen: false, // Estado para el modal de registro
  openVerRegistroModal: () => set({ isVerRegistroModalOpen: true }),
  closeVerRegistroModal: () => set({ isVerRegistroModalOpen: false })
}));

export default useVerRegistroStore;

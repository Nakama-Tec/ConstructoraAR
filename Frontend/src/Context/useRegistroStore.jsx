import { create } from 'zustand';

const useRegistroStore = create((set) => ({
  registroSeleccionado: null, 
  setRegistroSeleccionado: (registro) => set({ registroSeleccionado: registro }),
  clearRegistroSeleccionado: () => set({ registroSeleccionado: null }),

  isRegistroModalOpen: false, // Estado para el modal de registro
  openRegistroModal: () => set({ isRegistroModalOpen: true }),
  closeRegistroModal: () => set({ isRegistroModalOpen: false })
}));

export default useRegistroStore;

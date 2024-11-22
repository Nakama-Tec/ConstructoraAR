import { create } from 'zustand';

const useDeptoStore = create((set) => ({
  dptoSeleccionado: null, 
  setDeptoSeleccionado: (departamento) => set({ deptoSeleccionado: departamento }),
  clearDeptoSeleccionado: () => set({ deptoSeleccionado: null }),

  isRegistroModalOpen: false, // Estado para el modal de registro
  openRegistroModal: () => set({ isRegistroModalOpen: true }),
  closeRegistroModal: () => set({ isRegistroModalOpen: false })
}));

export default useDeptoStore;

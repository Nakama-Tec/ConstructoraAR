import { create } from 'zustand';

const useVerRegistroStore = create((set) => ({
  verRegistroSeleccionado: null, 
  setVerRegistroSeleccionado: (verRegistro) => set({ verRegistroSeleccionado: verRegistro }),
  clearVerRegistroSeleccionado: () => set({ verRegistroSeleccionado: null }),
}));

export default useVerRegistroStore;

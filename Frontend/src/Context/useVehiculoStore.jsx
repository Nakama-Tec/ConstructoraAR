import { create } from 'zustand';

const useVehiculoStore = create((set) => ({
  vehiculoSeleccionado: null, 
  setVehiculoSeleccionado: (vehiculo) => set({ vehiculoSeleccionado: vehiculo }),
  clearVehiculoSeleccionado: () => set({ vehiculoSeleccionado: null }),

  isRegistroModalOpen: false, // Estado para el modal de registro
  openRegistroModal: () => set({ isRegistroModalOpen: true }),
  closeRegistroModal: () => set({ isRegistroModalOpen: false })
}));

export default useVehiculoStore;

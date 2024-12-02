import { create } from "zustand"; 


const userDetalleStore = create((set) => ({
    detalleRegistroSeleccionado: null, 
    setDetalleRegistroSeleccionado: (detalleRegistro) => set({ detalleRegistroSeleccionado: detalleRegistro }),
    clearDetalleRegistroSeleccionado: () => set({ detalleRegistroSeleccionado: null }),
  }));

  export default userDetalleStore;
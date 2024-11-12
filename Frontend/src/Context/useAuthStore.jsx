import { create } from "zustand"; // Importar la función create de la librería zustand.
import { persist } from "zustand/middleware";

// Crear un store para el manejo de la autenticación
const useAuthStore = create(
  persist( // persist: Middleware que permite almacenar el estado en el almacenamiento local del navegador.
    (set) => ({
      token: null,
      userRole: null,
      setToken: (token) => set({ token }),
      setUserRole: (Rol) => set({ userRole: Rol }),
      clearAuth: () => set({ token: null, userRole: null }),
    }),
    {
      name: 'auth-storage', // Nombre de la clave en la que se almacenará el estado.
    }
  )
);

export default useAuthStore;

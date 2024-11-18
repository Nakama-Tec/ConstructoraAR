import { create } from "zustand"; // Importar la función create de la librería zustand.
import { persist } from "zustand/middleware";// Importar la función persist de la librería zustand/middleware.  

// Crear un store para el manejo de la autenticación
const useAuthStore = create(
  persist( // persist: Middleware que permite almacenar el estado en el almacenamiento local del navegador.
    (set) => ({
      token: null,// Estado inicial del token de autenticación.
      userRole: null,// Estado inicial del rol del usuario autenticado.
      setToken: (token) => set({ token }),// Función para establecer el token de autenticación.
      setUserRole: (Rol) => set({ userRole: Rol }),// Función para establecer el rol del usuario autenticado.
      clearAuth: () => set({ token: null, userRole: null }),// Función para limpiar el estado de autenticación.
    }),
    {
      name: 'auth-storage', // Nombre del almacenamiento local.
    }
  )
);

export default useAuthStore;

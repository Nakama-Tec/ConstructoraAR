import {create} from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(persist(
    (set) => ({
        token: "",
        admin: null,
        isAuth: false,
        setToken: (token) => set((state) => ({
            token,
            isAuth: true
        })),
        setAdmin: (admin) => set((state) => ({
            admin
        })),
        logout: () => set(state => ({
            token: "",
            admin: null,
            isAuth: false
        }))
    }), {
        name: 'auth'
    }
))
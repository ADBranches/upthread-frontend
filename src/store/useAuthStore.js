// src/store/useAuthStore.js
import { create } from "zustand"

export const useAuthStore = create((set) => ({
  user: null,
  access: null,
  refresh: null,
  authLoaded: false, // 🔹 indicates when localStorage has been checked

  setAuth: (data) => {
    localStorage.setItem("auth", JSON.stringify(data))
    set({ ...data, authLoaded: true })
  },

  rehydrate: () => {
    const stored = localStorage.getItem("auth")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        set({ ...parsed, authLoaded: true })
      } catch (err) {
        console.error("[AuthStore] Failed to parse persisted auth:", err)
        localStorage.removeItem("auth")
        set({ authLoaded: true })
      }
    } else {
      set({ authLoaded: true })
    }
  },

  logout: () => {
    localStorage.removeItem("auth")
    set({ user: null, access: null, refresh: null, authLoaded: true })
  },
}))

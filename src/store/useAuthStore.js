import { create } from "zustand"

export const useAuthStore = create((set) => ({
  user: null,
  access: null,
  refresh: null,
  setAuth: (payload) => set(payload),
  logout: () => set({ user: null, access: null, refresh: null }),
}))

// src/services/serviceService.js
import axios from "axios"
import { useAuthStore } from "../store/useAuthStore"
import { authService } from "./authService"

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1/services",
})

// auto-refresh logic
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config
    const { refresh, setAuth, user } = useAuthStore.getState()

    if (err.response?.status === 401 && refresh && !original._retry) {
      original._retry = true
      try {
        const data = await authService.refresh(refresh)
        setAuth({ user, access: data.access_token, refresh })
        original.headers["Authorization"] = `Bearer ${data.access_token}`
        return api(original)
      } catch (e) {
        console.warn("Refresh failed, logging out.")
        useAuthStore.getState().logout()
      }
    }
    return Promise.reject(err)
  }
)

export const serviceService = {
  async list() {
    return (await api.get("/")).data
  },
  async create(payload) {
    const { access } = useAuthStore.getState()
    return (
      await api.post("/", payload, {
        headers: { Authorization: `Bearer ${access}` },
      })
    ).data
  },
  async update(id, payload) {
    const { access } = useAuthStore.getState()
    return (
      await api.put(`/${id}`, payload, {
        headers: { Authorization: `Bearer ${access}` },
      })
    ).data
  },
  async remove(id) {
    const { access } = useAuthStore.getState()
    return (
      await api.delete(`/${id}`, {
        headers: { Authorization: `Bearer ${access}` },
      })
    ).data
  },
}

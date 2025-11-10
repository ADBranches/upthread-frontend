import axios from "axios"

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1/auth",
})

export const authService = {
  async register(data) {
    return (await api.post("/register", data)).data
  },
  async login(data) {
    return (await api.post("/login", data)).data
  },
  async refresh(token) {
    return (await api.post("/refresh", {}, {
      headers: { Authorization: `Bearer ${token}` },
    })).data
  },
}

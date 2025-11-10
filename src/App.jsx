// src/App.jsx
import { useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import Services from "./pages/Services"
import { useAuthStore } from "./store/useAuthStore"

function PrivateRoute({ children }) {
  const { access, authLoaded } = useAuthStore()

  if (!authLoaded) {
    return <div className="flex h-screen items-center justify-center text-gray-600">Loading session...</div>
  }

  return access ? children : <Navigate to="/" replace />
}

export default function App() {
  useEffect(() => {
    useAuthStore.getState().rehydrate()
  }, [])

  const { authLoaded } = useAuthStore()

  if (!authLoaded) {
    return <div className="flex h-screen items-center justify-center text-gray-600">Restoring session...</div>
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/services"
          element={
            <PrivateRoute>
              <Services />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

import { useAuthStore } from "../store/useAuthStore"

export default function Dashboard() {
  const { user, logout } = useAuthStore()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      <h1 className="text-3xl font-semibold">Welcome, {user?.full_name}</h1>
      <p className="mt-4 text-gray-600">Role: {user?.role}</p>
      <button
        onClick={logout}
        className="mt-8 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  )
}

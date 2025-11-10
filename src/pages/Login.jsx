import { useState } from "react";
import { authService } from "../services/authService";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  // 🔹 handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    const cleanPass = password.trim();

    if (!cleanEmail || !cleanPass) {
        alert("Email and password are required.");
        return;
    }

    setLoading(true);
    try {
        console.log("[Auth] Attempting login →", cleanEmail);
        const data = await authService.login({
        email: cleanEmail,
        password: cleanPass,
        });

        // 🔹 set global auth state
        setAuth({
        user: data.user,
        access: data.access_token,
        refresh: data.refresh_token,
        });

        alert(`✅ Welcome ${data.user.full_name}!`);
        console.log("[Auth] Login successful → redirecting /dashboard");
        navigate("/dashboard");
    } catch (err) {
        console.warn("[Auth] Login failed →", err);
        const code = err.response?.status;
        const message =
        code === 401
            ? "Invalid email or password."
            : code === 429
            ? "Too many attempts — please wait and try again."
            : err.response?.data?.error ||
            err.response?.data?.msg ||
            "Server unavailable. Please try again later.";
        alert(message);
    } finally {
        setLoading(false);
    }
  };


  // 🔹 UI
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <input
          type="email"
          className="border p-2 w-full mb-4 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="border p-2 w-full mb-4 rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p
          onClick={() => navigate("/signup")}
          className="text-sm text-blue-600 mt-3 cursor-pointer text-center hover:underline"
        >
          Don't have an account? Sign up
        </p>
      </form>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useAuthStore } from "../store/useAuthStore";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        // 🔹 Sanitize and prepare payload
        const payload = {
        email: email.trim(),
        password: password.trim(),
        full_name: fullName.trim(),
        };

        // 🔹 Basic client-side validation
        if (!payload.email || !payload.password || !payload.full_name) {
        alert("All fields are required.");
        setLoading(false);
        return;
        }

        console.log("[Auth] Registering new user →", payload.email);

        // 🔹 Attempt registration
        await authService.register(payload);

        // alert("✅ Account created successfully! You can now sign in.");
        // console.log("[Auth] Registration successful, redirecting → /login");

        // // Redirect back to login page
        // navigate("/");
        alert("✅ Account created successfully! Logging you in...");
        console.log("[Auth] Registration successful, auto-logging in...");

        try {
        const loginData = await authService.login({
            email: payload.email,
            password: payload.password,
        });

        useAuthStore.getState().setAuth({
            user: loginData.user,
            access: loginData.access_token,
            refresh: loginData.refresh_token,
        });

        console.log("[Auth] Auto-login successful → redirecting to /dashboard");
        navigate("/dashboard");
        } catch (loginErr) {
        console.warn("[Auth] Auto-login failed:", loginErr);
        console.log("Redirecting user to login page instead.");
        navigate("/");
        }

    } catch (err) {
        console.error("[Auth] Signup failed:", err);

        const message =
        err.response?.status === 409
            ? "User already exists. Please log in instead."
            : err.response?.data?.error ||
            err.response?.data?.msg ||
            "Signup failed. Please try again.";

        alert(message);
    } finally {
        setLoading(false);
    }
    };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
        <input
          type="text"
          className="border p-2 w-full mb-4 rounded"
          placeholder="Full name"
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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
          className="bg-green-600 text-white w-full py-2 rounded hover:bg-green-700"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>
        <p
          onClick={() => navigate("/")}
          className="text-sm text-blue-600 mt-3 cursor-pointer text-center"
        >
          Already have an account? Sign in
        </p>
      </form>
    </div>
  );
}

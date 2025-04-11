import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/accounts/login/",
        { email, password }
      );

      if (response.data.access) {
        setAuth({
          access: response.data.access,
          refresh: response.data.refresh,
          user: response.data.user
        });
        navigate("/");
      } else {
        setError("Login failed - no access token received");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        if (err.response.status === 401) {
          setError("Invalid email or password");
        } else {
          setError(
            err.response.data?.detail ||
            err.response.data?.message ||
            "Login failed. Please try again."
          );
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && (
        <p className="text-red-500 mb-4 p-2 bg-red-50 rounded">{error}</p>
      )}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-blue-400"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
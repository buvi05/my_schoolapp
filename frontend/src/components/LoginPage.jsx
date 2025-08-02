import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log("We are here");

    try {
      console.log("We are here1 ");
        const  local_url = "http://127.0.0.1:5000/auth/login"
        const  ec2_url= "http://16.176.172.125:5000/auth/login"
            console.log("Sending request to:", local_url);

        const res = await fetch(local_url, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ username, password }),
      });
      console.log("We are here 3");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save token
      localStorage.setItem("access_token", data.token);

      // Navigate based on role
      if (data.role === "admin") navigate("/dashboard/admin");
      else if (data.role === "teacher") navigate("/dashboard/teacher");
      else if (data.role === "parent") navigate("/dashboard/parent");
      else navigate("/"); // fallback

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-blue-500 px-4">
      <h2 className="text-3xl font-extrabold mb-6 text-blue-900">Login</h2>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white bg-opacity-80 rounded-lg shadow-lg p-8"
      >
        {error && (
          <div className="mb-4 p-2 text-red-700 bg-red-100 rounded">{error}</div>
        )}

        <input
          type="text"
          placeholder="Username"
          className="mb-4 px-4 py-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="mb-6 px-4 py-3 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-800 transition-colors duration-300 w-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

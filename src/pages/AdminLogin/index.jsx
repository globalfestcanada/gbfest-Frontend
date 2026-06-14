import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("https://globalfest-backend.onrender.com/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!data.success) {
      setError(data.message);
      return;
    }

    // Save token + role
    localStorage.setItem("adminToken", data.token);
    localStorage.setItem("adminRole", data.role);

    // Redirect to dashboard
    navigate("/admin/dashboard");
  };

  return (
    <div className="admin-login-container">
      <h1>Admin Login</h1>

      <form onSubmit={handleLogin} className="admin-login-form">
        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;

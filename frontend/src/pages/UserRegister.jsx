// frontend/src/pages/UserRegister.jsx

import React, { useState, useContext } from 'react'
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./styles/UserAuth.css";

export default function UserRegister() {
  const { register, isDemoMode } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await register(email, password);
    setMessage(result.message);
    if ( result.success) setTimeout(() => navigate("/dashboard"), 1000);
}

return (
  <div className="auth-page">
    <h2> Register {isDemoMode && "(Demo Mode)"} </h2>
    <p className="demo-note"> <strong>Demo only</strong> - Will need active backend for live registration</p>
    <form onSubmit={handleRegister}>
      <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      />
      <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      />
      <button type="submit">Register</button>
    </form>
    {message && <p>{message}</p>}
    <p>
      Already have an account? <a href="/login">Login Here</a>
      </p>
  </div>
);
}
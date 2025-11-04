// frontend/src/pages/UserRegister.jsx

import React, { useState, useContext } from 'react'
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

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
    if ( result.sucess) setTimeout(() => navigate("/"), 1000);
}

return (
  <div className="auth-page">
    <h2> Register {isDemoMode && "(Demo Mode)"} </h2>
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
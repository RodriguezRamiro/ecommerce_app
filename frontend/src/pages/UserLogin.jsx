// frontend/src/pages/UserLogin.jsx

import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
    const { login, isDemoMode} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    setMessage(result.message);
    if (result.success) setTimeout(() => navigate("/"), 1000);
  };

    return (
        <div className="auth-page">
            <h2>Login {isDemoMode && "(Demo Mode)"}</h2>
            <form onSubmit={handleLogin}>
                <input
                type="email"
                placeholder="Enter Email"
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
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            <p>
                Dont have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
};

export default UserLogin;
//frontend/src/context/UserContext.jsx


/**
 * Stores the current user
 * handles login, register and logout actions
 * suppourts mock mode (demo user)
 * persisting sessions in localStorage
 */


import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isDemoMode, setIsDemoMode] = useState(
        import.meta.env.VITE_USE_MOCK === "true"
    );

    // Load saved session (if any)
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    // Save session when user changes
    useEffect(() => {
        if(user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");
    }, [user]);

    const login = async (email, password) => {
        if (isDemoMode) {
            // Mock login for demo mode
            const demoUser = { email, name: "Demo User" };
            setUser(demoUser);
            return { success: true, message: "logged in (Demo Mode)" };
            } else {
                try {
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                    });
                    const data = await res.json();
                    if (res.ok) {
                        setUser(data.user);
                        return { sucess: true, message: "Logged in sucessfully" };
                    } else {
                        return { success: false, message: data.message || "Login failed" };
                    }
                } catch (err) {
                    console.error("Login error:", err);
                    return { success: false, message: "Network error" };
                }
            }
        };

        const register = async (email, password) => {
            if (isDemoMode) {
                // Mock Registration
                const demoUser = { email, name: "Demo User" };
                setUser(demoUser);
                return { sucess: true, message: "Registered (Demo Mode)" };
            } else {
                try {
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                    });
                    const data = await res.json();
                    if (res.ok) {
                        setUser(data.user);
                        return { success: true, message: "Registered successfully" };
                    } else {
                        return { success: false, message: data.message || "Registration failed" };
                    }
                } catch (err) {
                    console.error("Register error:", err);
                    return { success: false, message: "Network error"};
                }
            }
        };

        const logout = () => {
            setUser(null);
            localStorage.removeItem("user");
        };

        return (
            <UserContext.Provider value={{ user, login, register, logout, isDemoMode }}>
                {children}
            </UserContext.Provider>
        );
    };

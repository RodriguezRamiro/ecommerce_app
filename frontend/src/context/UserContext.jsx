//frontend/src/context/UserContext.jsx


/**
 * Stores the current user.
 * Handles login, register, and logout actions.
 * Supports mock/demo mode (VITE_USE_MOCK=true).
 * Persists sessions in localStorage. + Flask sessiion cookie.
 * Include admin-role placeholder for future backend expansion
 */


import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Normalize environment variables
  const isDemoMode = String(import.meta.env.VITE_USE_MOCK).toLowerCase() === "true";
  const API_URL =
    import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://127.0.0.1:5000/api";


    // Load saved session (if any)
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (err) {
            console.warn("Corrupted user data in localStorage, clearing...");
            localStorage.removeItem("user");
          }
        }
      }, []);

    // Save session when user changes
    useEffect(() => {
        if (user) localStorage.setItem("user", JSON.stringify(user));
        else localStorage.removeItem("user");
    }, [user]);

    //check bacend session on mount ( for persistance)
    useEffect(() => {
        const checkSession = async () => {
            try {
                const res = await fetch(`${API_URL}/users/current`, {
                    method: "GET",
                    credentials: "include",
                });
                const data = await res.json();
                if (data.user) {
                    setUser(data.user);1
            } else {
                setUser(null);
                localStorage.removeItem("user");
            }
        } catch (err) {
            console.error("session check failed:", err);
        }
    };
    if (!isDemoMode) {
        checkSession();
    }
    }, []);

    // Auth actions
    const login = async (email, password) => {
        if (isDemoMode) {
            // simulated login for demo mode
            const demoUser = { email, role: email === "admin@example.com" ? "admin" : "user"};
            setUser(demoUser);
            return { success: true, message: "Logged in (Demo Mode)" };
            }
                try {
                    const res = await fetch(`${API_URL}/users/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                        credentials: "include",
                    });

                    const data = await res.json();
                    if (res.ok && data.user) {
                        // If backkend doesnt send role yet, assume ' user' for now
                        const loggedInUser = { ...data.user, role: data.user.role || "user" };
                        setUser(loggedInUser);
                        return { sucess: true, message: "Logged in sucessfully" };
                    } else {
                        return { success: false, message: data.message || "Login failed" };
                    }
                } catch (err) {
                    console.error("Login error:", err);
                    return { success: false, message: "Network error" };
                }
            };

        const register = async (email, password) => {
            if (isDemoMode) {
                // Simulated Registration
                const demoUser = { email, role: email === "admin@example.com" ? "admin" : "user" };
                setUser(demoUser);
                return { sucess: true, message: "Registered (Demo Mode)" };
            }
            try {
                const res = await fetch(`${API_URL}/users/register`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password }),
                    credentials: "include",
                    });
                    const data = await res.json();
                    if (res.ok) {
                        // Mimic user for backend not vailable
                        const newUser = { email, role: email === "admin@example.com" ? "admin" : "user" };
                        setUser(newUser);
                        return { success: true, message: "Registered successfully" };
                    } else {
                        return { success: false, message: data.error || "Registration failed" };
                    }
                } catch (err) {
                    console.error("Register error:", err);
                    return { success: false, message: "Network error"};
            }
        };

        const logout = async () => {
          if (!isDemoMode) {
            try {
                await fetch(`${API_URL}/users/logout`, {
                    method:"POST",
                    credentials: "include",
                });
            } catch (err) {
              console.error("Logout error:", err);
            }
          }

          setUser(null);
          localStorage.removeItem("user");
        };

        // Debug Logging
        useEffect(() => {
            console.log(
                `%c[UserContext]%c Mode: ${isDemoMode ? "Demo" : "Live"} | API: ${API_URL}`,
                "color:#7DDA58;font-weight:bold;",
                "color:#ccc;"
              );
            }, []);

        return (
          <UserContext.Provider
          value={{
            user,
            login,
            register,
            logout,
            isDemoMode,
            isAdmin: user?.role === "admin",
            isLoggedIn: !!user,
             }}
             >
            {children}
          </UserContext.Provider>
        );
      };

//frontend/src/context/UserContext.jsx


/**
 * UserContext
 * - Provides user/session state for the app
 * - Supports demo mode (VITE_USE_MOCK=true) with persistent user + orderHistory in localStorage
 * - Supports live backend mode (Flask endpoints) using session cookies (credentials: "include")
 * - Exposes functions: login, register, logout, updateEmail, updatePassword, setPreferredStore,
 *   fetchUsersOrders, saveOrderToHistory
 *
 * Option B: preferredStore is NOT persisted to localStorage in demo mode.
 */


import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
    const [orderHistory, setOrderHistory] = useState(() => {
    const saved = localStorage.getItem("orderHistory");
    return saved ? JSON.parse(saved) : [];
  });

    //Runtime-Only preferredStore (Not persisted to localStoragein demo mode)
    const [preferredStore, setPreferredStoreState] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      if (saved) {
        const u = JSON.parse(saved);
        return u?.preferredStore || null;
      }
    } catch {}
    return null;
  });

    // Normalize environment variables
  const isDemoMode =
    String(import.meta.env.VITE_USE_MOCK).toLowerCase() === "true";
  const API_URL =
    import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
    "http://127.0.0.1:5000/api";

    // Persists user + orderHistory
     useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

      useEffect(() => {
        localStorage.setItem("orderHistory", JSON.stringify(orderHistory));
        }, [orderHistory]);

      // Helper - update in-memory user preferredStore no persistance in demo
      const setPreferredStoreLocal = (store) => {
        setPreferredStoreState(store || null);
        setUser((prev) => (prev ? { ...prev, preferredStore: store || null } : prev));
     };

      // On mount, if not demo mode, try to load sessions from backend
      useEffect(() => {
    if (isDemoMode) return;

    const checkSession = async () => {
      try {
        const res = await fetch(`${API_URL}/users/current`, {
          method: "GET",
          credentials: "include",
        });


                const data = await res.json();

        if (data.user) {
          setUser(data.user);
          if (data.user.preferredStore)
            setPreferredStoreState(data.user.preferredStore);

          await fetchUsersOrders();
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Session check failed:", err);
      }
    };
        checkSession();
    }, []);

    // Auth actions
    const login = async (email, password) => {
    if (isDemoMode) {
      const demoUser = {
        email,
        role: email === "admin@example.com" ? "admin" : "user",
        lastLogin: new Date().toISOString(),
        preferredStore: null,
      };

      setUser(demoUser);
      setPreferredStoreState(null);

      return { success: true, message: "Logged in (Demo Mode)" };
    }
                 try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        setUser(data.user);
        if (data.user.preferredStore)
          setPreferredStoreState(data.user.preferredStore);

        await fetchUsersOrders();

        return {
          success: true,
          message: "Logged in successfully",
          data: data.user,
        };
      }

      return { success: false, message: data.message || "Login failed" };
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: "Network error" };
    }
  };


        const register = async (email, password) => {
    if (isDemoMode) {
      const demoUser = {
        email,
        role: email === "admin@example.com" ? "admin" : "user",
        lastLogin: new Date().toISOString(),
        preferredStore: null,
      };
      setUser(demoUser);
      setPreferredStoreState(null);

      return {
        success: true,
        message: "Registered (Demo Mode)",
        data: demoUser,
      };
    }
    try {
      const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        const newUser =
          data.user || {
            email,
            role: email === "admin@example.com" ? "admin" : "user",
            preferredStore: null,
          };
          setUser(newUser);
        setPreferredStoreState(newUser.preferredStore || null);

        return { success: true, message: "Registered successfully", data: newUser };
      }

      return { success: false, message: data.error || "Registration failed" };
    } catch (err) {
      console.error("Register error:", err);
      return { success: false, message: "Network error" };
    }
  };
  const logout = async () => {
    if (!isDemoMode) {
      try {
        await fetch(`${API_URL}/users/logout`, {
          method: "POST",
          credentials: "include",
        });
      } catch (err) {
        console.error("Logout error:", err);
      }
    }

    setUser(null);
    setPreferredStoreState(null);
  };


        // Account update functions

        const updateEmail = async (newEmail) => {
    if (!newEmail)
      return { success: false, message: "Email required" };

    if (isDemoMode) {
      setUser((prev) => (prev ? { ...prev, email: newEmail } : prev));
      return { success: true, message: "Email updated (Demo Mode)" };
    }

    try {
      const res = await fetch(`${API_URL}/users/update-email`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: newEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user || null);
        return { success: true, message: "Email updated", data: data.user };
      }
      return { success: false, message: data.error || "Failed to update email" };
    } catch (err) {
      console.error("Update email error:", err);
      return { success: false, message: "Network error" };
    }
  };

  const updatePassword = async (oldPassword, newPassword) => {
    if (isDemoMode)
      return { success: true, message: "Password updated (Demo Mode)" };

    try {
      const res = await fetch(`${API_URL}/users/update-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();

      if (res.ok) return { success: true, message: "Password updated" };

      return {
        success: false,
        message: data.error || "Failed to update password",
      };
    } catch (err) {
      console.error("Update password error:", err);
      return { success: false, message: "Network error" };
    }
  };

    // Preferred store

    const setPreferredStore = async (store) => {
        if (!store || typeof store !== "object") {
            return { success: false, message: "Invalid store object"};
        }

        if (isDemoMode) {
            setPreferredStoreLocal(store);
            return { success: true, message: "Preferred store set (Demo Mode)"};
        };

        try {
            const res = await fetch(`${API_URL}/users/set-preferred-store`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ store }),
            });
            const data = await res.json();

            if (res.ok) {
                // backend returns preferredStore
                const p = data.preferredStore || store;
                setPreferredStoreLocal(p);
                return { success: true, message: "Preferred store set", data: p };
            }

            return {
                success: false,
                message: data.error || "Failed to set preferred store"
            };
        } catch (err) {
            console.error("Set preferred store error:", err);
            return { success: false, message: "Network error" };
        }
    };

    // Orders (history)

    // Fetch users orders from backend (live Mode). in demo returns local orderHistory.
    const fetchUsersOrders = async () => {
        if (isDemoMode) {
            return { success: true, data: orderHistory };
        }

        try {
            const res = await fetch(`${API_URL}/users/orders`, {
                method: "GET",
                credentials: "include",
            });

            const data = await res.json();
            if (res.ok) {
                // backend returns { orders: [...] }
                const orders = data.orders || [];
                setOrderHistory(orders);
                return { success: true, data: orders };
            }

            return { success: false, message: data.error || "Failed to fetch orders" };
        } catch (err) {
            console.error("Fetch orders error:", err);
            return { success: false, message: "Network error" };
        }
    };

    // Save order: pushes to backend (live) or to local orderHistory (demo)
    // Alse returns the saved oder.
    const saveOrderToHistory = async (order) => {
        if (!order) return { success: false, message: "Order required" };

        if (isDemoMode) {
            setOrderHistory((prev) => [...prev, order]);
            return { success: true, data: order };
        }

        try {
            const res = await fetch(`${API_URL}/users/orders`, {
                method: "POST",
                headers: { "Content-type": "application/json"},
                credentials: "include",
                body: JSON.stringify(order),
            });

            const data = await res.json();

            if (res.ok) {
                // Add saved order to client-side history
                setOrderHistory((prev) => [...prev, data.order]);
                return { success: true, data: data.order };
            }
            
            return { success: false, message: data.error || "Failed to save order" };
        } catch (err) {
            console.error("save order error:", err);
            return { success: false, message: "Network error" };
        }
    };

        return (
          <UserContext.Provider
          value={{
            user,
            login,
            register,
            logout,
            updateEmail,
            updatePassword,
            preferredStore,
            setPreferredStore,
            orderHistory,
            fetchUsersOrders,
            saveOrderToHistory,
            isDemoMode,
            isAdmin: user?.role === "admin",
            isLoggedIn: !!user,
             }}
             >
            {children}
          </UserContext.Provider>
        );
      };

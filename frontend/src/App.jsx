// src/App.jsx

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import CartDrawer from "./components/CartDrawer";
import ProductDetail from "./pages/ProductDetail";


// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

// A custom hook for local storage to avoid repetition and potential bugs.
function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    } catch (error) {
      console.error("Error retrieving from local storage:", error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to local storage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  // A custom hook for managing state in local storage.
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);

  // Theme persistence to local storage using the custom hook.
  const [darkMode, setDarkMode] = useLocalStorage("theme", false);

  // Handle adding product to cart.
  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    setIsCartOpen(true); // auto-open cart when adding
  };

  // Handle removing cart products.
  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  // Update quantity (for +/- buttons in cart drawer).
  const handleUpdateQuantity = (productId, qty) => {
    if (qty <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: qty } : item
        )
      );
    }
  };

  return (
    <Router>
      <div className={`app-container ${darkMode ? "dark-mode" : "light-mode"}`}>
        {/* Pass cart count to Navbar */}
        <Navbar
          cartCount={cartItems.length}
          onToggleCart={() => setIsCartOpen(true)}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Main content area */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
            <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
            <Route path="/product/:id" element={<ProductDetail onAddToCart={handleAddToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemoveFromCart={handleRemoveFromCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Cart Drawer (global) */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
      </div>
    </Router>
  );
}

export default App;

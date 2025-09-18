// src/App.jsx

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import CartDrawer from "./components/CartDrawer";


// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";


function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);


 // Handle adding product to cart
 const handleAddToCart = (product) => {
  setCartItems((prev) => [...prev, product]);
};


   // Handle removing cart products
   const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <Router>
      <div
        className="min-h-screen flex flex-col
        bg-gradient-to-r from-blue-500 to-purple-600
        dark:from-gray-900 dark:to-gray-800
        text-gray-900 dark:text-gray-100
        transition-colors duration-500 ease-in-out"
      >
        {/* Pass cart count to Navbar */}
        <Navbar
          cartCount={cartItems.length}
          onCartClick={() => setIsCartOpen(true)}
        />

      {/* Main content area */}
      <main className="flex-grow p-6">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />

            {/* Other Pages */}
            <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </main>

      {/* Cart Drawer (global, not tied to one page) */}
      <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
        />
      </div>
    </Router>
  );
}

export default App;

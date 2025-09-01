//src/app.jsx

import { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import ProductGrid from "./components/ProductGrid";
import CartDrawer from "./components/CartDrawer";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const[isCartOpen, setIsCartOpen] = useState(false);


  // Handle adding product to cart
  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);

  };

  // Handle remmoving cart products
  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-purple-600">
      {/* Pass cart count to Navbar */}
      <Navbar cartCount={cartItems.length}
      onCartClick={() => setIsCartOpen(true)}
      />

      <main className="flex-grow p-6">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome to the E-Shop
          </h2>
          <p className="mt-4 text-gray-600">
            Browse our products and add them to your cart. Shop with Confidence,
            Elegance, and Style!
          </p>

          {/* Pass add-to-cart handler to ProductGrid */}
          <ProductGrid onAddToCart={handleAddToCart} />
        </div>
      </main>

      {/* Cart Drawer */}
      <CartDrawer
      isOpen={isCartOpen}
      onClose={() => setIsCartOpen(flase)}
      cartItems={cartItems}
      onRemoveFromCart={handleRemoveFromCart}
      />
    </div>
  );
}

export default App;

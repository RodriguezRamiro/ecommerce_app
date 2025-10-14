//frontend/src/context/CartContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";

// Create Context
const CartContext = createContext();

// Hook to use CartContext easily
export function useCart() {
  return useContext(CartContext);
}

// Provider Component
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  // Remove product
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Update quantity
  const updateQty = (id, newQty) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, newQty) } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => setCart([]);

  // Total items in cart
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

// Total price of all items in the cart
const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

return (
  <CartContext.Provider
    value={{
      cart,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      cartCount,
      total,
    }}
  >
    {children}
  </CartContext.Provider>
);
}

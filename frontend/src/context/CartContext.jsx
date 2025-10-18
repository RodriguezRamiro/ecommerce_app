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

  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product
  const addToCart = (product, qty = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
          ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prevCart, { ...product, qty }];
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
  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const taxRate = 0.07; //7%
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Generate & store order details when user check out
  const placeOrder = () => {
    if(cart.length === 0 ) return null;

  const orderNumber = Math.floor(100000 + Math.random() * 900000); //6-digit random number

  const orderData = {
    orderNumber,
    item: cart,
    subtotal,
    tax,
    total,
    date: new Date().toISOString(),
  };

  setLastOrder(orderData);
  clearCart();   // reset cart after placing order

  return orderData;
};

return (
  <CartContext.Provider
    value={{
      cart,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      cartCount,
      subtotal,
      tax,
      total,
      lastOrder,
      setLastOrder,
      placeOrder,
    }}
  >
    {children}
  </CartContext.Provider>
);
}

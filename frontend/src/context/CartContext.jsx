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
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] =useState(null);

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

  // Totals
  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const taxRate = 0.07;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Place Order (demo flow)
  const placeOrder = async () => {
    if (cart.length === 0) return null;

    setIsProcessing(true);
    setError(null);

    try {
      // Artificical delay to simulate processing
      await new Promise((res) => setTimeout(res, 2000));

      const orderNumber = Math.floor(100000 + Math.random() * 900000);

      const orderData = {
        orderNumber,
        items: cart,
        subtotal,
        tax,
        total,
        date: new Date().toISOString(),
        status: "confirmed",
      };

      // DEMO Mode - simulate order success
      setLastOrder(orderData);
      clearCart();

      // Live payment Processing
      /*
      const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
      });

      if (!response.ok) {
      trhow new Error("Failed to process order");}
    }
      const savedOrder = await response.json();
      setLastOrder(savedOrder);
      clearCart();
      */

      return orderData;
    } catch (err) {
      console.error("Order Error:", err);
      setError("something went wrong while placing your order.");
      return null;
    } finally {
      setIsProcessing(false);
    }
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
        isProcessing,
        error,
      }}
    >
      {children}
      </CartContext.Provider>
    );
  }

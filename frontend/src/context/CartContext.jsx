//frontend/src/context/CartContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

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

  // Store Selection (persisted)
  const defaultStore = {
    id: "Main00-1",
    name: "Eshop Main",
    city: "Tampa",
    zip: 33619,
  };


  const [selectedStore, setSelectedStore] = useState(() => {
    const saved = localStorage.getItem("selectedStore");
    return saved ? JSON.parse(saved) : defaultStore;
  });

  useEffect(() => {
    localStorage.setItem("selectedStore", JSON.stringify(selectedStore));
  }, [selectedStore]);

 useEffect(() => {
  localStorage.setItem("selectedStore", JSON.stringify(selectedStore));
}, [selectedStore]);

const [drawerHasOpenedOnce, setDrawerHasOpenedOnce] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const addToCart = (product, qty = 1) => {
    const isFirstItem = cart.length === 0;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }

      return [...prev, { ...product, qty }];
    });

    // Auto-open drawer once in the entire session
    if (isFirstItem && !drawerHasOpenedOnce) {
      setIsDrawerOpen(true);
      setDrawerHasOpenedOnce(true);
    }
  };

  // Remove product
  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));

    // Update quantity
  const updateQty = (id, newQty) =>
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, newQty) } : item
      )
    );

    // Clear cart
  const clearCart = () => setCart([]);


  // Totals
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const taxRate = 0.07;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;



  // Place Order (demo flow)
  const [lastOrder, setLastOrder] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

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
        store: selectedStore,
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

      return orderData;
    } catch (err) {
      console.error("Order Error:", err);
      setError("Something went wrong while placing your order.");
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
        // Store related values
        selectedStore,
        setSelectedStore,
        defaultStore,
        //Drawer Controls
        drawerHasOpenedOnce,
        setDrawerHasOpenedOnce,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
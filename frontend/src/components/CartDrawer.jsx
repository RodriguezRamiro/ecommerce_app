// frontend/src/components/CartDrawer.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import StoreLocator from "../pages/StoreLocator";
import "./styles/CartDrawer.css";

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQty, total, placeOrder, selectedStore, setSelectedStore } = useCart();
  const [showStorePicker, setShowStorePicker] = useState(false);
  const navigate = useNavigate();


  const handleCheckout = () => {
    const order = placeOrder();
    if (order) {
      onClose();
      navigate("/confirmation");
    }
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="cart-overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />

          {/* Drawer */}
          <motion.div
            className="cart-drawer"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 25,
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            {/* Header */}
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button onClick={onClose} aria-label="Close cart">
                ✕
              </button>
            </div>

            {/* Store selections */}
            <div className="drawer-store-section">
              <div className="drawer-store-header">
              <span className="drawer-store-name">
                {selectedStore ? selectedStore.name : "No store selected"}
                </span>
            </div>

            <button className="drawer-change-store-btn"
            onClick={() => setShowStorePicker(!showStorePicker)}
            >
              {showStorePicker ? "Close" : "Change Store"}
            </button>
            </div>


            {/* Store Locator */}
            {showStorePicker && (
              <div className="cart-store-locator">
                <StoreLocator
                  compact={true}
                  onSelectStore={(store) => {
                    setSelectedStore(store);
                    setShowStorePicker(false); // hide on selection
                  }}
                />
              </div>
            )}

            {/* Cart Items */}
            <div className="cart-items">
              {cart.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img
                      src={item.img || "https://via.placeholder.com/80"}
                      alt={item.name}
                      className="cart-item-img"
                    />
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p>${item.price?.toFixed(2)}</p>
                      <div className="cart-qty-controls">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          disabled={item.qty <= 1}
                        >
                          -
                        </button>
                        <span>{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                        >
                          +
                        </button>
                      </div>
                      <p className="cart-item-subtotal">
                        Subtotal: ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link to="/cart" onClick={onClose} className="view-cart-btn">
                View Cart
              </Link>

              {/* Check out order */}
              <button onClick={() => navigate("/payment")} className="checkout-btn">
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// frontend/src/components/CartDrawer.jsx


import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/CartDrawer.css";

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onRemoveFromCart,
  onUpdateQuantity,
}) {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

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
          />

          {/* Drawer */}
          <motion.div
            className="cart-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
          >
            {/* Header */}
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button onClick={onClose} aria-label="Close cart">
                ✕
              </button>
            </div>

            {/* Cart Items */}
            <div className="cart-items">
              {cartItems.length === 0 ? (
                <p className="empty-cart">Your cart is empty</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="cart-item-img"
                    />
                    <div className="cart-item-details">
                      <h3>{item.name}</h3>
                      <p>${item.price.toFixed(2)}</p>
                      <div className="cart-qty-controls">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, (item.quantity || 1) - 1)
                          }
                          disabled={(item.quantity || 1) <= 1}
                        >
                          -
                        </button>
                        <span>{item.quantity || 1}</span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, (item.quantity || 1) + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemoveFromCart(item.id)}
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
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <Link to="/checkout" onClick={onClose} className="checkout-btn">
                Checkout
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
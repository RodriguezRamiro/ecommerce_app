// frontend/src/components/CartDrawer.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import "./styles/CartDrawer.css";

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQty, total } = useCart();

  // Store search state
  const [storesData, setStoresData] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load stores JSON on mount
  useEffect(() => {
    setLoading(true);
    fetch("/data/stores.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch stores");
        return res.json();
      })
      .then((data) => {
        setStoresData(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((err) => {
        console.error("Error fetching stores:", err);
        setError("Could not load stores. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const isZip = /^\d{5}$/.test(query.trim());
    const filtered = storesData.filter((store) =>
      isZip
        ? store.zip.includes(query.trim())
        : store.name.toLowerCase().includes(query.toLowerCase()) ||
          store.address.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
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

            {/* Store Locator */}
            <div className="store-search-section">
              <h3>Find a Store Near You</h3>
              <form className="store-search-form" onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Enter city or ZIP code..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
              </form>
              {loading && <div className="spinner">Searching...</div>}
              {error && <p className="error-message">{error}</p>}
              <ul className="store-results">
                {!loading && !error && results.length > 0 ? (
                  results.map((store) => (
                    <li key={store.id}>
                      <strong>{store.name}</strong>
                      <div>{store.address}</div>
                    </li>
                  ))
                ) : (
                  !loading &&
                  !error &&
                  query && <p className="no-results">No Stores Found for "{query}"</p>
                )}
              </ul>
            </div>

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

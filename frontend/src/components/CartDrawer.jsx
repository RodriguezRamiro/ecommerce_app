// frontend/src/components/CartDrawer.jsx


import React, { useState, useEffect } from "react";
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


  // Store search state
  const [storesData, setStoresData] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

{/*
// Mock store data (replace with API)
const stores = [
  { id: 1, name: "Downtown Store", address: "123 Main St, Cityville", zip: "10001" },
  { id: 2, name: "Uptown Store", address: "456 Elm St, Cityville", zip: "10027" },
  { id: 3, name: "Suburb Store", address: "789 Oak St, Townsville", zip: "60601" },
];
*/}

// Load stores JSON on mount
useEffect(() => {
  setLoading(true);
  fetch("/data/stores.json")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch stores");
      return res.json();
    })
    .then((data) => {
      setStoresData(data);
      setError(null);
    })
    .catch((err) => {
      console.error("Error fetching stores:", err);
      setError("Could not load stores. Please try again later.");
    })
    .finally(() => setLoading(false));
}, []);



  //Check if input is numeric zip code or text city
  const handleSearch = (e) => {
    e.preventDefault();

    const isZip = /^\d{5}$/.test(query.trim());
    const filtered = storesData.filter((store) =>
      isZip
        ? store.zip.includes(query.trim())
        : store.name.toLowerCase().includes(query.toLowerCase()) ||
          store.address.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

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
              <button onClick={onClose} aria-label="Close cart">✕</button>
            </div>

            {/* Store Locator Section */}
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

  {/* Loading Spinner */}
  {loading && <div className="spinner">Searching...</div>}

{/* Error Message */}
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
    query && (
      <p className="no-results">
        No Stores Found for "{query}".
      </p>
    )
  )}
</ul>
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

// frontend/src/pages/Cart.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Cart.css";

export default function Cart({ cartItems }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // Store search state
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Mock store data (replace with API call later)
  const stores = [
    { id: 1, name: "Downtown Store", address: "123 Main St, Cityville" },
    { id: 2, name: "Uptown Store", address: "456 Elm St, Cityville" },
    { id: 3, name: "Suburb Store", address: "789 Oak St, Townsville" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = stores.filter(
      (store) =>
        store.name.toLowerCase().includes(query.toLowerCase()) ||
        store.address.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-cart">
          Your cart is empty.{" "}
          <Link to="/shop" className="shop-link">
            Go Shopping
          </Link>
        </p>
      ) : (
        <div className="cart-container">
          {/* Cart Items */}
          <ul className="cart-items">
            {cartItems.map((item, idx) => (
              <li key={idx} className="cart-item">
                <span className="item-name">{item.name}</span>
                <span className="item-price">${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>

          {/* Total */}
          <div className="cart-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Checkout button */}
          <div className="checkout-container">
            <Link to="/checkout" className="checkout-btn">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}

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

        <ul className="store-results">
          {results.length > 0 ? (
            results.map((store) => (
              <li key={store.id}>
                <strong>{store.name}</strong>
                <div>{store.address}</div>
              </li>
            ))
          ) : (
            query && <p className="no-results">No Stores Found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

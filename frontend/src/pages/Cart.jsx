// frontend/src/pages/Cart.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./styles/Cart.css";

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);


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

      {/* Empty cart message */}
      {cart.length === 0 ? (
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
            {cart.map((item) => (
              <li key={item.id} className="cart-item">

                {/* Product Thumbnail */}
                <Link to={`/product/${item.id}`}>
                  <img
                  src={item.img || "https://via.placeholder.com/60"}
                  alt={item.name}
                  className="item-thumbnail"
                  />
                </Link>

                {/* Name and Price */}
                <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-price">${item.price.toFixed(2)}</span>

                {/* Quantity Controls */}
                <div className="item-qty">
                  <button
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  disabled={item.qty <= 1}
                  >
                  -
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                </div>
                </div>

                {/* Subtotal */}
                <span className="items-subtotal">
                  ${(item.price * item.qty).toFixed(2)}
                </span>

                {/* Remove Item */}
                <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
                >
                  x
                </button>
              </li>
            ))}
          </ul>

          {/* Total */}
          <div className="cart-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Clear Cart */}
          <button className="clear-cart-btn" onClick={clearCart}>
            Clear Cart
          </button>

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

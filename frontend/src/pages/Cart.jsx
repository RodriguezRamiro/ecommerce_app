//src/pages/Cart.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./styles/Cart.css";

export default function Cart({ cartItems }) {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );


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
              <ul className="cart-items">
                {cartItems.map((item, idx) => (
                  <li key={idx} className="cart-item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">
                      ${item.price.toFixed(2)}
                    </span>
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
        </div>
      );
    }

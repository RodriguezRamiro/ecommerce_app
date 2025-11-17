// frontend/src/pages/Cart.jsx


import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { useCart } from "../context/CartContext";
import StoreLocator from "./StoreLocator";
import "./styles/Cart.css";

export default function Cart() {
  const { cart, removeFromCart, updateQty, clearCart, total, placeOrder } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const order = placeOrder();
    if (order) navigate("/confirmation");
  };


  return (
    <div className="cart-page">
      {/* Store Locator */}
      <StoreLocator compact={true} />

      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">
          Your cart is empty.{" "}
          <Link to="/shop" className="shop-link">
            Go Shopping
          </Link>
        </p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="cart-container">
            <ul className="cart-items">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.img || "https://via.placeholder.com/60"}
                      alt={item.name}
                      className="item-thumbnail"
                    />
                  </Link>

                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">${item.price.toFixed(2)}</span>

                    <div className="item-qty">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        disabled={item.qty <= 1}
                      >
                        -
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>
                        +
                      </button>
                    </div>
                  </div>

                  <span className="items-subtotal">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
          </div>


          {/* Order Summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax (7%)</span>
              <span>${(total * 0.07).toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${(total * 1.07).toFixed(2)}</span>
            </div>

            {/* Checkout button */}
            <div className="checkout-actions">
                <button
                  onClick={() => navigate("/payment")}
                  className="checkout-btn"
                >
                  Proceed to Checkout
                </button>
                <Link to="/shop" className="continue-shopping-btn">
                  ← Continue Shopping
                </Link>
              </div>
            </div>

          {/* Clear Cart */}
          <div className="cart-actions">
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}

    </div>
  );
}

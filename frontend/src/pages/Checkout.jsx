//src/pages/Checkout.jsx

import React from "react";
import { createOrder } from "../utils/api";
import "./styles/Checkout.css";

export default function Checkout() {
    return (
      <div className="checkout-page">
        <h2>Checkout</h2>
        <p className="checkout-info">
          Complete your purchase securely. Enter your details below.
        </p>

        <form className="checkout-form">
          {/* Name */}
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Your Name" />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="your@email.com" />
          </div>

          {/* Address */}
          <div className="form-group">
            <label>Address</label>
            <input type="text" placeholder="123 Main St" />
          </div>

          {/* Payment */}
          <div className="form-group">
            <label>Payment Info</label>
            <input type="text" placeholder="Card Number" />
          </div>

          {/* Submit */}
          <button type="submit" className="submit-btn">
            Place Order
          </button>
        </form>
      </div>
    );
  }

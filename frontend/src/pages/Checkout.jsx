//src/pages/Checkout.jsx

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { createOrder } from "../utils/api";
import "./styles/Checkout.css";

export default function Checkout() {
  const { cart, clearCart } = useCart();

  // Calculate total from cart
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    payment: "",
  });

  // Message state
  const [message, setMessage] = useState("");

   // Update form fields
   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setMessage("❌ Your cart is empty!");
      return;
    }

    const orderData = {
      ...formData,
      items: cart,
      total,
    };

    try {
      const response = await createOrder(orderData);

      if (response.success) {
        setMessage("✅ Order placed successfully!");
        clearCart();
        setFormData({ name: "", email: "", address: "", payment: "" });
      } else {
        setMessage("❌ Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Error placing order.");
    }
  };


  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      <p className="checkout-info">
        Complete your purchase securely. Enter your details below.
      </p>

      {/* 🛒 Cart Summary */}
      <div className="cart-summary">
        <h3>Order Summary</h3>
        {cart.length === 0 ? (
           <p>Your cart is empty.</p>
           ) : (
             <>
               <ul className="cart-summary-list">
                 {cart.map((item) => (
                   <li key={item.id}>
                     {item.name} × {item.qty} — $
                     {(item.price * item.qty).toFixed(2)}
                   </li>
                 ))}
               </ul>
               <p className="cart-summary-total">
                 <strong>Total:</strong> ${total.toFixed(2)}
               </p>
             </>
           )}
         </div>

        {/* 📝 Checkout Form */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          
          {/* Name */}
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
        </div>

          {/* Email */}
          <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
        </div>

          {/* Address */}
          <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Main St"
            required
          />
        </div>

          {/* Payment */}
          <div className="form-group">
          <label>Payment Info</label>
          <input
            type="text"
            name="payment"
            value={formData.payment}
            onChange={handleChange}
            placeholder="Card Number"
            required
          />
        </div>

          {/* Submit */}
          <button type="submit"
          className="submit-btn"
          disabled={cart.length === 0}
          >
          Place Order
        </button>
      </form>

      {message && <p className="checkout-message">{message}</p>}
    </div>
  );
}

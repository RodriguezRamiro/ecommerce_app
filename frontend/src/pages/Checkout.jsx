//src/pages/Checkout.jsx

import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../utils/api";
import "./styles/Checkout.css";


export default function Checkout() {
  const { cart, clearCart, setLastOrder, selectedStore } = useCart();
  const navigate = useNavigate();

  // Subtotal (derived)
  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + (item.price || 0) * (item.qty || 0), 0),
    [cart]
  );

  // Tax calculations
  const taxRate = 0.07; // 7% tax
  const tax = useMemo(() => subtotal * taxRate, [subtotal]);
  const grandTotal = useMemo(() => subtotal + tax, [subtotal, tax]);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    payment: "",
  });

  // Message state
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

   // Update form fields
   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Local validation helper (can expand later)
  const formIsValid = () =>
  formData.name.trim() &&
  formData.email.trim() &&
  formData.address.trim() &&
  formData.payment.trim();

  // Generate unique order number
  const generateOrderNumber = () => {
    const datePart = new Date().toISOString().slice(0,10).replace(/-/g,'');
    const randomPart = Math.floor(10000 + Math.random() * 90000); // 5 digit random number
    return `ORD-${datePart}-${randomPart}`
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setMessage("❌ Your cart is empty!");
      return;
    }

    setLoading(true);
    setMessage("");

    // Order payload. Use Grand total as total, back end sees final amount.

    const orderData = {
      customer_name: formData.name,
      email: formData.email,
      adress: formData.address,
      payment: formData.payment,
      items: cart,
      subtotal: Number(subtotal.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      total: Number(grandTotal.toFixed(2)),
      created_at: new Date().toISOString(),
      orderNumber: generateOrderNumber(),
      store: selectedStore
    };

    try {

      // adapt depending on API: createOrder, helpers return create order or an object { success: true }
      const response = await createOrder(orderData);
      const ok =
      response &&
      (response.success);

    if (ok) {
          setMessage("✅ Order placed successfully!");
          setLastOrder(orderData); // Save last order for confirmation page
          clearCart();
          setFormData({ name: "", email:"", address: "", payment: "" });
          navigate("/confirmation");
        } else {
          // Show debug info if available
          setMessage("❌ Failed to place order. Please try again.");
          console.warn("createOrder response:", response);
        }
    } catch (err) {
      console.error("Order error:", err);
      setMessage("⚠️ Error placing order.");
    } finally {
      setLoading(false);
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

        {selectedStore && (
          <div className="checkout-store-banner">
            <strong>Store:</strong> {selectedStore.name} - {selectedStore.city} ({selectedStore.zip})
          </div>
        )}
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

               <div className="cart-summary-breakdown">
                <div className="cart-summary-row">
                 <span>Subtotal:</span>
                 <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="cart-summary-row">
               <p className="cart-summary-tax">
               <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
                <span>${tax.toFixed(2)}</span>
               </p>
               </div>

               <div className="cart-summary-row total">
               <p className="cart-summary-total">
               <strong>Total</strong>
                <strong>${grandTotal.toFixed(2)}</strong>
               </p>
                </div>
                </div>
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
            placeholder="Card Number (mock)"
            required
          />
        </div>

          {/* Submit */}
          <button type="submit"
          className="submit-btn"
          disabled={cart.length === 0 || loading || !formIsValid()}
          >
            {loading ? "placing order..." : "Place Order"}
            </button>
          </form>

      {message && <p className="checkout-message">{message}</p>}
    </div>
  );
}

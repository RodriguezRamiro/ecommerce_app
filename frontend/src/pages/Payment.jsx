// frontend/src/pages/Payment.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./styles/Payment.css";

export default function Payment() {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const navigate = useNavigate();
  const { cart, placeOrder, isProcessing } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mock Validation for Realism
    if (!cardName || !cardNumber || !expiry || !cvv) {
      alert("Please fill in all fields (demo only).");
      return;
    }

    // Demo Order olacement
    const order = await placeOrder();

    if (order) {
      console.log("💳 Demo payment successful:", order);
      navigate("/confirmation");
    } else {
      alert("Payment failed. Please try again.");
    }
  };



    return (
        <div className="payment-page">
            <h2>Paymnet information</h2>
            <p className="demo-note"> <strong>Demo only</strong> — no real payment is processed. Any input will work.</p>

            {isProcessing ? (
                <div className="processing-indicator">
                    <div className="spinner" />
                    <p>Processsing your demo Payment...</p>
                    </div>
             ) : (
            <form className="payment-form" onSubmit={handleSubmit}>
                <label>
                    Name on Card
                <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Name"
                required
                />
                </label>
                <label>
                    Card Number
                    <input
                    type="text"
                    maxLength="16"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1111 2222 3333 4444"
                    required
                    />
                </label>
                <div className="payment-row">
                    <label>
                        Expiry
                        <input
                        type="text"
                        maxLength="5"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                required
            />
            </label>
            <label>
                CVV
                <input
                type="text"
                maxLength="4"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                required
                />
            </label>
            </div>
            <button type="submit" className="mock-pay-btn">
                Complete Payment
            </button>
        </form>
             )}
    </div>
    );
}

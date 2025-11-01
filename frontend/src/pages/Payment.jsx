// frontend/src/pages/Payment.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Payment.css";

export default function Payment() {
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefuault();

        //Demo effect - pretend to process payment
        setTimeout(() => {
            console.log("Mock payment successfull");
            navigate("/confirmation")
        }, 1000);
    };

    return (
        <div className="payment-page">
            <h2>Paymnet information</h2>
            <p className="demo-note"> Demo only - no real payment is processed.</p>

            <form className="payment-form" onSubmit={handleSubmit}>
                <label>
                    Name on Card
                <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
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
    </div>
    );
}
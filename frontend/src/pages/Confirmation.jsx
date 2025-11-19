// frontend/src/pages/Confirmation.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./styles/Confirmation.css";


export default function Confirmation() {
    const navigate = useNavigate();
    const { lastOrder } = useCart();
    const [orderNumber, setOrderNumber] = useState(null);


    // If no order esists bakc to home
    useEffect(() => {
        if(!lastOrder) {
            navigate("/");
            return;
    }

    // Generate or load order number
        if (lastOrder.orderNumber) {
            setOrderNumber(lastOrder.orderNumber);
            } else {
                const newOrderNum = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
                setOrderNumber(newOrderNum);
            }
    }, [lastOrder, navigate]);

    if (!lastOrder) return null; // prevents empty ui flash before redirecting


    return (
        <div className="confirmation-page">
            <h2> Thank you for Your Order!</h2>
            <p> We've recieved your order and are preparing it for shipment.</p>

            {/* Order Summary */}
      <div className="order-details">
        <p className="order-number">
          <strong>Order #:</strong> {orderNumber}
        </p>

        {lastOrder.items && lastOrder.items.length > 0 ? (
          <ul className="order-items">
            {lastOrder.items.map((item) => (
              <li key={item.id} className="order-item">
                <span className="item-name">{item.name}</span>
                <span className="item-qty">x {item.qty}</span>
                <span className="item-price">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No items found in your order.</p>
        )}

        <div className="order-summary">
        {lastOrder.store && (
          <p className="order-store">
            <strong>Store:</strong> {lastOrder.store.name} — {lastOrder.store.city} ({lastOrder.store.zip})
          </p>
        )}
          <p>
            <strong>Subtotal:</strong> $
            {lastOrder?.subtotal?.toFixed(2) || "0.00"}
          </p>
          <p>
            <strong>Tax (7%):</strong> $
            {lastOrder?.tax?.toFixed(2) || "0.00"}
          </p>
          <p className="order-total">
            <strong>Total:</strong> $
            {lastOrder?.total?.toFixed(2) || "0.00"}
          </p>
        </div>
      </div>

      <div className="confirmation-actions">
        <button onClick={() => window.print()}> Print / Save as PDF</button>
        <button onClick={() => navigate("/")}> Back to Home</button>
        <button onClick={() => navigate("/shop")}> Continue Shopping</button>
      </div>

      {/* 🔹 Future Backend Hook (Commented Out) */}
      {/*
        useEffect(() => {
          async function fetchOrder() {
            const res = await fetch(`/api/orders/${orderNumber}`);
            const data = await res.json();
            setOrder(data);
          }
          fetchOrder();
        }, [orderNumber]);
      */}
    </div>
  );
}
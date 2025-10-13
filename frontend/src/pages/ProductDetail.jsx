// frontend/src/pages/ProductDetail.jsx

import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import products from "../data/products.js";
import "./styles/ProductDetail.css";

export default function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useCart(); // get addToCArt
    const product = products.find((p) => p.id === parseInt(id));
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return <p className="not-found">Product not found.</p>;
      }

      const handleAddToCart = () => {
        addToCart(product, quantity);
      };


      return (
        <div className="product-detail-container">
          <Link to="/shop" className="back-link">
            ← Back to Shop
          </Link>

          <div className="product-detail-card">
            
            {/* Image */}
            <div className="product-image">
              <img
                src={product.img || "https://via.placeholder.com/400x400"}
                alt={product.name}
              />
            </div>

            {/* Details */}
            <div className="product-info">
                <h2 className="product-nmae">{product.name}</h2>
                <p className="product-prce">${product.price.toFixed(2)}</p>
                <p className="product-description">{product.description}</p>

            {/* Quantity Selector */}
            <div className="quantity-selector">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q = q + 1)}>+</button>
            </div>

            {/* Add to Cart BUtton */}
            <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            >
                Add to Cart
            </button>
            </div>
        </div>
    </div>
  );
}

// frontend/src/pages/ProductDetail.jsx

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { fetchProductById } from "../utils/api";
import "./styles/ProductDetail.css";

export default function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useCart(); // get addToCArt
    const [product, setProduct] = useState(null)
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    // Fetch product (back or mock depends on env)
    useEffect(() => {
      async function loadProduct() {
        const data = await fetchProductById(Number(id));
        setProduct(data);
        setLoading(false);
      }
      loadProduct();
    }, [id]);

    // Loading state
    if (loading) {
      return <p className="loading">Loading product...</p>;
    }

    // Product not found
    if (!product || product.error) {
        return (
        <div>
          <p className="not-found">Product not found.</p>
        <Link to="/shop" className="back-linck">← Back to Shop</Link>";
        </div>
        );
      }

      // Add to cart
      const handleAddToCart = () => {
        addToCart(product, quantity);
        console.log(`✅ Added ${quantity} × ${product.name} to cart`);
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
                <h2 className="product-name">{product.name}</h2>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <p className="product-description">{product.description}</p>

            {/* Quantity Selector */}
            <div className="quantity-selector">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
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

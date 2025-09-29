// frontend/src/components/ProductCard.jsx

import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./styles/ProductCard.css";

// Inline SVG fallback
const fallbackSvg = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
    <rect width="100%" height="100%" fill="#F3F4F6"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
      fill="#9CA3AF" font-family="Arial" font-size="20">
      Image Not Available
    </text>
  </svg>`
)}`;

export default function ProductCard({ product, onAddToCart }) {
  const [src, setSrc] = useState(product.image || fallbackSvg);

  const formattedPrice =
    product.price != null ? `$${product.price.toFixed(2)}` : "N/A";

  return (
    <div className="product-card">
      {/* Badge for featured products */}
      {product.badge && (
        <div className={`badge ${product.badge.toLowerCase()}`}>
          {product.badge}
        </div>
      )}



      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
      <img
          src={src}
          alt={product.name || "Unnamed product"}
          onError={() => setSrc(fallbackSvg)}
        /> {/* Fallback on error */}
      </Link>

      {/* Title */}
      <h3 className="product-title">
        <Link to={`/product/${product.id}`}>{product.name}</Link>
      </h3>


      {/* Product description */}
      <p className="product-description">
        {product.description || "No description available."}
      </p>

      {/* Product Price + button */}
      <div className="product-footer">
        <span className="product-price">{formattedPrice}</span>
        <button
          type="button"
          aria-label={`Add ${product.name || "product"} to cart`}
          onClick={() => onAddToCart(product)}
          className="add-btn"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
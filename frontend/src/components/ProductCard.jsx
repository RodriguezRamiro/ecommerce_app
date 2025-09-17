// frontend/src/components/ProductCard.jsx
import React, { useState } from "react";

// Inline SVG fallback (Base64-encoded SVG for safety)
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transform transition p-4 flex flex-col cursor-pointer">
      {/* Product Image */}
      <img
        src={src}
        alt={`${product.name} product image`}
        className="h-40 w-full object-cover rounded-lg mb-4"
        onError={() => setSrc(fallbackSvg)} // fallback if broken
      />

      {/* Product Details */}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        {product.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">
        {product.description}
      </p>

      {/* Product Price + button */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
          ${product.price.toFixed(2)}
        </span>
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

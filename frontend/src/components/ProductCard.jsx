//frontend/src/components/ProductCard.jsx

import React from "react";

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transform transition p-4 flex flex-col cursor-pointer">
      {/* Product Image */}
      <img
        src={product.image}
        alt={`${product.name} product image`}
        className="h-40 w-full object-cover rounded-lg mb-4"
      />

      {/* Product Details */}
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-gray-600 text-sm flex-grow">{product.description}</p>

      {/* Product Price + button */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold text-blue-600">
          ${product.price.toFixed(2)}
        </span>
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

//src/pages/Home.jsx

import React from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../components/ProductGrid";


export default function Home({ onAddToCart }) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Welcome to The E-Shop
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8 transition-colors duration-500">
            Discover the latest products, shop with ease, and enjoy a modern,
            elegant shopping experience.
          </p>

        {/* Call-to-Action button */}
        <Link
          to="/shop"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-md hover:scale-105 hover:bg-blue-700 transition transform"
        >
          Start Shopping
        </Link>
      </div>

      {/* Featured Products Section */}
      <div
        className="w-full max-w-6xl mx-auto
        bg-white dark:bg-gray-800
        text-gray-900 dark:text-gray-100
        rounded-2xl shadow-lg p-8
        transition-colors duration-500 ease-in-out animate-fade"
      >
        <h2 className="text-3xl font-semibold mb-6">Featured Products</h2>
        <ProductGrid onAddToCart={onAddToCart} />
      </div>
    </div>
  );
}

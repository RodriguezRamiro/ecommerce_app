//src/pages/Shop.jsx

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import products from "../data/products";
import ProductList from "../components/ProductList";

export default function Shop({ onAddToCart }) {
  return (
    <div className="flex-1 container mx-auto px-6 py-12 space-y-12">
      {/* Title + Subtitle */}
      <div className="text-center">
        <motion.h1
          className="text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Shop All Products
        </motion.h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Browse our collection and find your next favorite item.
        </p>
      </div>

      {/* Filter + Sort Bar (static for now) */}
      <div className="flex flex-wrap justify-between items-center gap-4 border-b pb-4">
        <div className="space-x-2">
          <button className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700">
            All
          </button>
          <button className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            Accessories
          </button>
          <button className="px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            Apparel
          </button>
        </div>
        <select className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-900">
          <option>Sort by</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <ProductList
      products={products}
      onAddToCardt={onAddToCart}
      title={null}
      />

        {/* CTA below grid */}
        <div className="text-center">
            <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white hover:scale-105 transition font-medium shadow-md"
            >
            Back to Home
            </Link>
        </div>
    </div>
  );
}

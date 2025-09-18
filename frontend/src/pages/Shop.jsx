//src/pages/Shop.jsx

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import products from "../data/products";

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
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1 } },
        }}
      >
        {/* Empty state */}
        {products.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            No products available right now.
          </p>
        )}

        {/* Render products */}
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden flex flex-col hover:shadow-2xl transition transform hover:-translate-y-1"
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4 flex flex-col flex-1 justify-between">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">
                ${product.price.toFixed(2)}
              </p>
              <button
                onClick={() => onAddToCart(product)}
                className="mt-3 w-full px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-purple-600 hover:to-blue-500 transition font-medium"
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

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
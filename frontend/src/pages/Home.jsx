//src/pages/Home.jsx


import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import products from "../data/products";
import ProductList from "../components/ProductList";

export default function Home({ onAddToCart }) {
  const featured = products.filter((p) => p.featured);

  return (
    <div className="flex-1 container mx-auto px-6 py-12 space-y-12">
      {/* Hero Section */}
      <motion.div
        className="text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px--8 py-12 space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Welcome to E-Shop
        </h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Discover the latest trends in fashion & accessories.
        </p>
        <div className="mt-6">
          <Link
            to="/shop"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white hover:scale-105 transition font-medium shadow-lg"
          >
            Shop Now
          </Link>
        </div>
      </motion.div>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Featured Products
          </h2>
          <Link
            to="/shop"
            className="text-blue-500 hover:text-purple-600 font-medium transition-colors"
          >
            View All →
          </Link>
        </div>

        {/* Reuse ProductList instead of hand-rolling cards */}
        <ProductList
          products={featured}
          onAddToCart={onAddToCart}
          title={null} // we already have our own heading above
        />
      </section>
    </div>
  );
}

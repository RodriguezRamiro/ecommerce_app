//src/pages/Home.jsx

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import products from "../data/products";

export default function Home({ onAddToCart }) {
  const featured = products.filter((p) => p.featured);

  return (
    <div className="flex-1 container mx-auto px-6 py-12 space-y-12">
      {/* Hero Section */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Welcome to E-Shop
        </h1>
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Discover the latest trends in fashion & accessories.
        </p>
        <div className="mt-6">
          <Link
            to="/shop"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 text-white hover:scale-105 transition font-medium shadow-md"
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
            className="text-blue-500 hover:text-purple-600 font-medium"
          >
            View All →
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {featured.length === 0 && (
            <p className="col-span-full text-center text-gray-500">
              No featured products available right now.
            </p>
          )}

          {featured.map((product) => (
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
                <h3 className="text-lg font-semibold">{product.name}</h3>
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
      </section>
    </div>
  );
}


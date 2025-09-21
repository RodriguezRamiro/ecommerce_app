//frontend/src/components/ProductList.jsx

import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

//example static data (to move into backend/api later)

// animation variants

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  }
}

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  export default function ProductList({
    products = [],
    onAddToCart,
    title = null,
    limit = null,
    gridCols = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3", // flexible grids

  }) {
    // apply limit if provided
    const productsToShow = limit ? products.slice(0, limit) : products;

    return (
      <div className="w-full space-y-6">
        {/* optional title */}
        {title && (
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray100 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
          {title}
          </h2>
          )}

          <motion.div
          className={`grid ${gridCols} gap-8`}
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.15 }
            },
          }}
        >

            {/* Empty State */}
            {productsToShow.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                No products available right now.
              </p>
            )}

            {/* Render Products */}
            {productsToShow.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
              <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              />
          </motion.div>
            ))}
            </motion.div>
        </div>
    );
  }
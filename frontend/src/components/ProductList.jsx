//frontend/src/components/ProductList.jsx

import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import "./styles/ProductList.css";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function ProductList({
  products = [],
  onAddToCart,
  title = null,
  limit = null,
  gridCols = "three",
}) {
    // apply limit if provided
    const productsToShow = limit ? products.slice(0, limit) : products;

    return (
      <div className="product-list">
        {/* Optional Title */}
        {title && <h2 className="product-list-title">{title}</h2>}

        <motion.div
          className={`product-grid ${gridCols}`}
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {/* Empty State */}
          {productsToShow.length === 0 && (
            <p className="empty-state">No products available right now.</p>
          )}

          {/* Render Products */}
          {productsToShow.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} onAddToCart={onAddToCart ?? (() => {})} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  }
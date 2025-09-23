//src/pages/Shop.jsx

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import products from "../data/products";
import ProductList from "../components/ProductList";
import "./styles/Shop.css";

export default function Shop({ onAddToCart }) {
    return (
      <div className="shop-container">
        {/* Title + Subtitle */}
        <div className="shop-header">
          <motion.h1
            className="shop-title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Shop All Products
          </motion.h1>
          <p className="shop-subtitle">
            Browse our collection and find your next favorite item.
          </p>
        </div>

        {/* Filter + Sort Bar */}
        <div className="filter-bar">
          <div className="filter-buttons">
            <button className="filter-button">All</button>
            <button className="filter-button">Accessories</button>
            <button className="filter-button">Apparel</button>
          </div>
          <select className="sort-select">
            <option>Sort by</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <ProductList products={products} onAddToCart={onAddToCart} title={null} />

        {/* CTA */}
        <div className="shop-cta">
          <Link to="/" className="cta-button">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
//src/pages/Home.jsx


import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import products from "../data/products";
import ProductList from "../components/ProductList";
import "./styles/Home.css";

export default function Home({ onAddToCart }) {
  const featured = products.filter((p) => p.featured);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <motion.div
        className="hero-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="hero-title">Welcome to E-Shop</h1>
        <p className="hero-subtitle">
          Discover the latest trends in fashion & accessories.
        </p>
        <Link to="/shop" className="hero-button">
          Shop Now
        </Link>
      </motion.div>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="featured-header">
          <h2>Featured Products</h2>
          <Link to="/shop" className="view-all-link">
            View All →
          </Link>
        </div>

        <ProductList
          products={featured}
          onAddToCart={onAddToCart}
          title={null} // heading already above
        />
      </section>
    </div>
  );
}

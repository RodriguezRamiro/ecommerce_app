//src/pages/Home.jsx


import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import products from "../data/products";
import ProductList from "../components/ProductList";
import Button from "../components/Button";
import "./styles/Home.css";

export default function Home({ onAddToCart }) {
    const featured = products.filter(
        (p) => p.badge && p.badge.toLowerCase() === "featured"
      );
  const categories = [...new Set(products.map((p) => p.category))];

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
        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Discover the latest trends in fashion & accessories.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link to="/shop" aria-label="Go to Shop page">
          <button className="btn-cta">Start Shopping</button>
          </Link>
        </motion.div>
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

      {/* Why shop with us */}
      <section className="value-props">
        <h2>Why Shop With US</h2>
        <div className="value-grid">
            <div className="value-card">
                <span className="icon">🚚</span>
                <h3>Free Shipping</h3>
                <p>Fast & Free worldwide delivery</p>
        </div>
        <div className="value-card">
            <span className="icon">💳</span>
            <h3>Premium Quality</h3><p>Staff hand-selected Items</p>
        </div>
        <div className="value-card">
            <span className="icon">🤝</span>


            <h3>24/7 Support</h3>
            <p> Our team is always here to help you.</p>
        </div>
        </div>
        </section>

        {/* Call to Action Banner */}
        <section className="cta-banner">
            <h2>Upgrade Your Style Today</h2>
            <Link to="/shop" aria-label="Go to Shop">
                <button className="btn-cta">Start Shopping</button>
            </Link>
        </section>
    </div>
  );
}

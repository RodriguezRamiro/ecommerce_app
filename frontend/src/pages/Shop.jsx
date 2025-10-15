//src/pages/Shop.jsx

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import products from "../data/products";
import ProductList from "../components/ProductList";
import "./styles/Shop.css";

export default function Shop() {

    const { addToCart } = useCart();

    // State for filters and sorting
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortOption, setSortOption] = useState(''); // "", "lowToHigh", "highToLow"

    // Derived product list
    const displayProducts = useMemo(() => {
        let filtered = [...products];

    // Filtered by category
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(
                (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }
    // Sorted by Price
    if (sortOption === 'lowToHigh') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'highToLow')  {
        filtered.sort((a, b) => b.price - a.price);
    }
    return filtered;
    }, [selectedCategory, sortOption]);


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
            {['All', 'Accessories', 'Apparel', 'Footwear'].map((cat) => (
                <button
                key={cat}
                className={`filter-button ${selectedCategory === cat ? 'active' : ""
            }`}
            onClick={() => setSelectedCategory(cat)}
            >
                {cat}
            </button>
            ))}
          </div>

          <select className="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            >
            <option value="">Sort By</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <ProductList
        products={displayProducts} onAddToCart={addToCart} title={null} />

        {/* CTA */}
        <div className="shop-cta">
          <Link to="/" className="cta-button">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
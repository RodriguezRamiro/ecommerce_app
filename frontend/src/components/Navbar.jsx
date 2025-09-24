// frontend/src/components/Navbar.jsx

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./styles/Navbar.css";

export default function Navbar(onToggleCart, darkMode, setDarkMode) {
  const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    // Get cart state + actions from context
    const { cart, cartCount } = useCart();

  // Apply dark mode on mount and on toggle
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const isActive = (path) =>
  location.pathname === path ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="logo">
          E-Shop
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          <li>
            <Link to="/" className={isActive("/")}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className={isActive("/shop")}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/about" className={isActive("/about")}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className={isActive("/contact")}>
              Contact
            </Link>
          </li>
        </ul>

        {/* Right side buttons */}
        <div className="nav-actions">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="dark-toggle"
          >
            {darkMode ? "🌞" : "🌙"}
          </button>

          {/* Cart */}
          <button className="cart-btn" onClick={onToggleCart}>
            Cart
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          <Link to="/" className={isActive("/")}>
            Home
          </Link>
          <Link to="/shop" className={isActive("/shop")}>
            Products
          </Link>
          <Link to="/about" className={isActive("/about")}>
            About
          </Link>
          <Link to="/contact" className={isActive("/contact")}>
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
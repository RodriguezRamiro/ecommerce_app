// frontend/src/components/Navbar.jsx

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./styles/Navbar.css";

export default function Navbar({ onToggleCart, darkMode, setDarkMode, adminLink, serverStatus }) {
  const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const { cartCount } = useCart();



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
          {/* Server Status Indicator */}
          <span className={`server-dot ${serverStatus}`}
          title={
            serverStatus === "online"
            ? "Backend connected"
            : serverStatus === "offline"
            ? "Backend offline"
            : "checking..."
          }
          ></span>

          {/* Dark Mode Toggle */}
          <button className="dark-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* Cart */}
          <button className="cart-btn" onClick={onToggleCart}>
          🛒
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>

          {/* admin link to be removed after backend integration */}
          {adminLink && <a href="/admin" className="admin-link">Admin Login</a>}

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
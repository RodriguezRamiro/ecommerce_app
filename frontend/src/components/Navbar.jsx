// frontend/src/components/Navbar.jsx

import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import "./styles/Navbar.css";

export default function Navbar({ onToggleCart, darkMode, setDarkMode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { cartCount, selectedStore} = useCart();
  const { user, logout } = useContext(UserContext);



  // Apply dark mode on mount and on toggle
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
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
          {/* Store Locatore */}
          {selectedStore ? (
            <div className="nav-store-indicator">
              <span className="store-label">Shopping:</span>
              <span className="store-name">{selectedStore.name}</span>
            </div>
          ) : (
            <div className="nav-store-indicator">
              <span className="store-label">Store:</span>
              <span className="store-name">None Selected</span>
            </div>
          )}

          {/* Cart */}
          <button className="cart-btn" onClick={onToggleCart}>
          🛒
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>


          {/* User Controls */}
          {user ? (
            <>
              <span className="user-name">Hi, {user.name}</span>
              <button onClick={logout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-link">Login</Link>
              <Link to="/register" className="register-link">Register</Link>
            </>
          )}

          {/* Dark Mode Toggle */}
          <button className="dark-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
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
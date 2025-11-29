// frontend/src/components/Navbar.jsx

import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import "./styles/Navbar.css";


export default function Navbar({ onToggleCart, darkMode, setDarkMode }) {
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { cartCount, selectedStore } = useCart();
  const { user, logout } = useContext(UserContext);



  // Apply dark mode on mount and on toggle
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark-mode", darkMode);
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
          <li><Link to="/" className={isActive("/")}>Home</Link></li>
          <li><Link to="/shop" className={isActive("/shop")}>Products</Link></li>
          <li><Link to="/about" className={isActive("/about")}>About</Link></li>
          <li><Link to="/contact" className={isActive("/contact")}>Contact</Link></li>
        </ul>


        {/* Right side buttons */}
        <div className="nav-actions">
          {/* Store Indicator */}
          <div className="nav-store-indicator">
            <span className="store-label">Store:</span>
            <span className="store-name">
              {selectedStore ? selectedStore.name : "None Selected"}
            </span>
          </div>



          {/* User Dropdown */}
          {user ? (
            <div className="user-menu">
              <button
                className="user-name"
                onClick={() => setAccountOpen(!accountOpen)}
              >
                Hi, {user.name} ▼
              </button>

              {accountOpen && (
                <div className="user-dropdown">
                  <Link
                    to="/dashboard"
                    onClick={() => setAccountOpen(false)}
                  >
                    My Account
                  </Link>

                  <button onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-link">Login</Link>
          )}

          {/* Cart */}
          <button className="cart-btn" onClick={onToggleCart}>
            🛒
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>

          {/* Dark Mode */}
          <button
            className={`dark-toggle ${darkMode ? "active" : ""}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <span className="toggle-thumb">
              {darkMode ? "🌑" : "🌕"}
            </span>
          </button>

     {/* Mobile */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-menu">
          <Link to="/" className={isActive("/")}>Home</Link>
          <Link to="/shop" className={isActive("/shop")}>Products</Link>
          <Link to="/about" className={isActive("/about")}>About</Link>
          <Link to="/contact" className={isActive("/contact")}>Contact</Link>
        </div>
      )}
    </nav>
  );
}
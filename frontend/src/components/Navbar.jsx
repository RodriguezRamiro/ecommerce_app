// frontend/src/components/Navbar.jsx

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ cartCount, onCartClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
    const location = useLocation();

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
  location.pathname === path
  ? "text-indigo_400 font-semibold"
  : "hover:text-indigo-400";

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/90 background-blur-md text-white shadow-md dark:bg-gray-800/90 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8">
        <div className="px-6 py-4 flex justify-between items-center">
          {/* Brand Logo */}
          <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide bg-gardient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            E-Shop
          </Link>


          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8 text-lg">
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
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors duration-300"
            >
              {darkMode ? "🌞" : "🌙"}
            </button>

            {/* Cart */}
            <button
              className="relative bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={onCartClick}
            >
              Cart
              {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {cartCount}
              </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded hover:bg-gray-800 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-2 bg-gray-800 dark:bg-gray-700 shadow-md">
          <Link to="/" className={`block px-3 py-2 rounded-md ${isActive("/")}`}>
            Home
          </Link>
          <Link
          to="/shop"
          className={`block px-3 py-2 rounded-md ${isActive("/shop")}`}>
            Products
          </Link>
          <Link
          to="/about"
          className={`block px-3 py-2 rounded-md ${isActive("/about")}`}>
            About
          </Link>
          <Link
          to="/contact"
          className={`block px-3 py-2 rounded-md ${isActive("/conctact")}`}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}

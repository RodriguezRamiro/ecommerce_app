// frontend/src/components/Navbar.jsx
import React, { useState, useEffect } from "react";

export default function Navbar({ cartCount, onCartClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;

    // Add fade class for transition
    root.classList.add("theme-fade");

    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'light');
    }

    //Remove the fade class after animation
    const timeout = setTimeout(() => {
      root.classList.remove('theme-fade');
    }, 500);

    return () => clearTimeout(timeout);
  }, [darkMode]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-gray-900 text-white shadow-md dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8">
        <div className="px-6 py-4 flex justify-between items-center">
          {/* Brand Logo */}
          <h1 className="text-2xl font-bold tracking-wide">
            E-Shop (structural phase)
          </h1>

          {/* Navigation Links */}
          <ul className="hidden md:flex space-x-6">
            <li><a href="#" className="hover:text-indigo-400 transition">Home</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Products</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">About</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Contact</a></li>
          </ul>

          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded bg-gray-700 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 transition-colors duration-300"
            >
              {darkMode ? (
                <span role="img" aria-label="sun">🌞</span>
              ) : (
                <span role="img" aria-label="moon">🌙</span>
              )}
            </button>

            {/* Cart */}
            <button
              className="relative bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              onClick={onCartClick}
            >
              Cart
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Button */}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-2 bg-gray-800 dark:bg-gray-700 transition-colors duration-300">
          <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md">Home</a>
          <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md">Products</a>
          <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md">About</a>
          <a href="#" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md">Contact</a>
        </div>
      )}
    </nav>
  );
}

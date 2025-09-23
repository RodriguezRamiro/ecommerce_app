//src/pages/NotFound.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./styles/NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-code">404</h1>
      <p className="notfound-message">
        Oops! The page you're looking for doesn't exist.
      </p>

      <div className="notfound-buttons">
        <Link to="/" className="btn-primary">
          Go Home
        </Link>
        <Link to="/shop" className="btn-secondary">
          Visit Shop
        </Link>
      </div>
    </div>
  );
}
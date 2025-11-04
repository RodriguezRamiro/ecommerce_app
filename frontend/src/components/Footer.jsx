//frontend/src/components/Footer.jsx

import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "./styles/Footer.css";


export default function Footer({ serverStatus }) {
  const { user } = useContext(UserContext);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h3 className="footer-logo">RodriguezTech Solutions</h3>
          <p>&copy; {new Date().getFullYear()} RodriguezTech. All rights reserved.</p>
          <p className="status-text">
            <span className={`server-dot ${serverStatus}`}></span>
            {serverStatus === "checking"
              ? "Checking server status..."
              : serverStatus === "online"
              ? "Backend: Online (Demo Mode Active)"
              : "Backend: Offline (Demo Mode Active)"}
          </p>
          {user && <p className="user-status">Logged in as {user.email}</p>}
        </div>

        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/products">Products</a>
          <a href="/contact">Contact</a>
          <a href="/store-locator">Store Locator</a>
        </div>

        <div className="footer-socials">
          <a href="#" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

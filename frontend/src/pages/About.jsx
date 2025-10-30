// frontend/pages/About.jsx

import React from "react";
import "./styles/About.css";

export default function About() {
  return (
    <div className="about-container">
      <h1>About E-Shop</h1>

      <p>
        Welcome to <strong>E-Shop</strong> — a modern online storefront designed
        to deliver a seamless shopping experience. Our goal is to make online
        shopping <em>intuitive</em>, <em>fast</em>, and <em>enjoyable</em> for
        everyone.
      </p>

      <p>
        This project was created as a <strong>portfolio & technical demo</strong>
        by <strong>RodriguezTech Solutions</strong>. It showcases a full-stack
        web application built with React, Flask, and modern web technologies.
      </p>

      <h2>⚡ Features Highlight</h2>
      <ul className="features-list">
        <li>Dynamic product catalog with real-time data fetching</li>
        <li>Shopping cart with add/remove/update functionality</li>
        <li>Checkout flow with order confirmation and JSON-based data storage</li>
        <li>Responsive, mobile-first UI with Framer Motion animations</li>
        <li>Portfolio-ready: demonstrates full-stack architecture and clean code</li>
      </ul>

      <h2>🛠️ Built With</h2>
      <ul className="tech-list">
        <li><strong>Frontend:</strong> React 18, React Router, Framer Motion</li>
        <li><strong>Styling:</strong> Custom CSS Modules, Flexbox, CSS Grid</li>
        <li><strong>Backend:</strong> Flask + Python, RESTful API ready for database integration</li>
        <li><strong>Data:</strong> JSON mock data, future-ready for PostgreSQL/MySQL</li>
        <li><strong>UX:</strong> Live cart drawer, animated transitions, responsive design</li>
      </ul>

      <h2>Why It Matters</h2>
      <p>
        E-Shop demonstrates how to build a production-ready full-stack
        application from scratch. It emphasizes component reusability,
        modular architecture, and clean, maintainable code — all skills that
        are crucial for professional development.
      </p>
    </div>
  );
}

//frontend/pages/About.jsx

import React from "react";
import "./styles/About.css";

export default function About() {
  return (
    <div className="about-container">
      <h1>About E-Shop</h1>

      <p>
        Welcome to <strong>E-Shop</strong> — an online storefront built to deliver a
        seamless, modern shopping experience for fashion and accessories.
        Our mission is to make online shopping <em>effortless</em>,
        <em>stylish</em>, and <em>enjoyable</em> for every customer.
      </p>

      <p>
        Beyond being a store, E-Shop was developed as a **technical demo and
        portfolio project** by <strong>RodriguezTech Solutions</strong> to showcase
        full-stack web development skills. The platform integrates a functional
        shopping cart, real-time store locator, dynamic product listings, and
        responsive UI/UX.
      </p>

      <h2>🛠️ Built With</h2>
      <ul className="tech-list">
        <li><strong>Frontend:</strong> React 18, React Router, Framer Motion for animations</li>
        <li><strong>Styling:</strong> Custom CSS Modules / Flexbox / Grid for a responsive layout</li>
        <li><strong>Backend (demo API):</strong> Flask + Python (future-ready for full CRUD)</li>
        <li><strong>Data:</strong> JSON mock data & REST-style fetching (ready for DB integration)</li>
        <li><strong>UX Features:</strong> Searchable store-locator widget, live cart drawer with animations</li>
      </ul>

      <h2>Why It Matters</h2>
      <p>
        This project demonstrates how to design, build, and deploy a fully
        functional e-commerce experience from scratch — blending user-centric
        design with robust technical foundations. It’s an evolving project that
        highlights clean architecture, reusable React components, and scalable
        code practices.
      </p>
    </div>
  );
}

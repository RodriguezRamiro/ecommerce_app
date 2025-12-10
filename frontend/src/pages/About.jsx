// frontend/pages/About.jsx

import React from "react";
import "./styles/About.css";

export default function About() {
  return (
    <div className="about-container">
      <h1>About E-Shop</h1>

      <p>
        <strong>E-Shop</strong> is a modern, full-stack ecommerce application
        built to demonstrate clean architecture, responsive UI design, and real
        production-style features. It delivers a seamless shopping experience
        with smooth navigation, a live cart drawer, and polished animations
        throughout the interface.
      </p>

      <p>
        This project was designed and developed by{" "}
        <strong>RodriguezTech Solutions</strong> as a{" "}
        <strong>portfolio-ready technical showcase</strong> highlighting practical
          full-stack development skills using React and Flask.
      </p>

      <h2>⚡ Key Features</h2>
      <ul className="features-list">
        <li>Dynamic product catalog with real-time API fetching</li>
        <li>Fully interactive cart with add/remove/update functionality</li>
        <li>Slide-in cart drawer with Framer Motion animations</li>
        <li>Full user authentication system (register, login, logout)</li>
        <li>User order history with persistent storage</li>
        <li>
          Admin dashboard with complete product management:
          <ul>
            <li>Create new products</li>
            <li>Edit/update existing products</li>
            <li>Delete products</li>
            <li>View inventory lists</li>
          </ul>
        </li>
        <li>Responsive design for mobile, tablet, and desktop</li>
      </ul>

      <h2>🛠️ Technology Stack</h2>
      <ul className="tech-list">
        <li><strong>Frontend:</strong> React 18, React Router, Framer Motion</li>
        <li><strong>Styling:</strong> Custom CSS Modules, Flexbox, Grid</li>
        <li><strong>Backend:</strong> Flask (Python) with RESTful architecture</li>
        <li><strong>Auth:</strong> Secure credential handling, session-based login</li>
        <li><strong>Data:</strong> JSON mock storage (migratable to SQL databases)</li>
      </ul>

      <h2>🚀 Engineering Focus</h2>
      <p>
        E-Shop demonstrates real-world application structure including modular
        components, state management, RESTful API communication, and role-based
        features such as admin-level product controls. The project emphasizes
        scalability, reusability, and high-quality UI/UX to reflect production
        engineering principles.
      </p>

      <h2>📈 Future Improvements</h2>
      <ul className="features-list">
        <li>Integration with PostgreSQL or MySQL for persistent data</li>
        <li>Stripe/PayPal payment integration for real checkout</li>
        <li>Cloud deployment via Render, DigitalOcean, or AWS</li>
        <li>Image uploads for products via Cloudinary or S3</li>
        <li>Admin roles and multi-user permission levels</li>
      </ul>


      <h2>👨‍💻 About the Developer</h2>
      <p>
        This application was built by{" "}
        <strong>
          Ramiro Rodriguez{" "}
          <a href="https://rodriguezcodesolutions.tech/">
            (RodriguezTech Solutions)
          </a>
        </strong>{" "}
        as part of a growing portfolio of full-stack software projects.
        It reflects hands-on experience with modern JavaScript frameworks, backend API
        design, UI/UX principles, and production-ready application structure.
      </p>
    </div>
  );
}
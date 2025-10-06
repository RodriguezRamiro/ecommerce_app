//frontend/src/pages/Contact.jsx

import React, { useState } from 'react';
import { submitContactForm } from '../utils/api';
import './styles/Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setError("");

    try {
      const res = await submitContactForm(formData);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      console.log("Server response:", res);
    } catch (err) {
      setError("Failed to send message. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      {status && <p className="success">{status}</p>}
      {error && <p className="error">{error}</p>}
      <p>We’d love to hear from you! Fill out the form below to reach us.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Send Message
        </button>
      </form>
    </div>
  );
}

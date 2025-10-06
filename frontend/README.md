# React + Vite Ecommerce App

This project is an **ecommerce web application** built with React and Vite. It includes product listings, a shopping cart, checkout flow, dark mode, and reusable components.

It started from a minimal Vite React template and has been **refactored to remove Tailwind CSS** in favor of custom CSS for better maintainability and flexibility.

## Features

- Home page with featured products
- Shop page with all products, filter buttons, and sort options
- Product grid and list components with animation using Framer Motion
- Product cards with image fallback, price formatting, and add-to-cart button
- Cart drawer accessible from all pages
  - Quantity adjustment
  - Remove items
  - Auto-open on add-to-cart
- Cart and Checkout pages
- Dark mode toggle
- 404 NotFound page for unknown routes
- Responsive layout

## Project Structure

backend/
│
├── app.py                # Main entry point
├── routes/               # All route files
│   ├── __init__.py
│   ├── products.py
│   ├── contact.py
│   ├── orders.py
│   └── health.py
│
├── data/                 # JSON mock data
│   └── products.json
│
└── utils/                # Utility/helper functions
    ├── __init__.py
    └── validators.py     # For form validation

frontend/
├── src/
│ ├── components/ # Reusable components (Navbar, Button, ProductCard, CartDrawer, etc.)
│ ├── context/ # Context providers (CartProvider)
│ ├── data/ # Static product data
│ ├── pages/ # App pages (Home, Shop, Cart, Checkout, NotFound)
│ ├── App.jsx # Main App component with routing
│ ├── main.jsx # Entry point with CartProvider
│ ├── index.css # Global CSS
│ └── App.css # Component-specific styles


## Getting Started

1. Clone the repo:

```bash
git clone https://github.com/your-username/ecommerce_app.git
cd ecommerce_app

npm install
npm run dev

Open your browser at the provided local URL (usually http://localhost:5173).

Notes

All styling is done with custom CSS, no Tailwind.

Cart state is managed locally using React useState and CartContext.

Animations are handled with Framer Motion
.

Future improvements may include backend integration, global cart persistence, and payment processing.


Vite React Template Info

Currently, two official plugins are available:

@vitejs/plugin-react
 uses Babel
 for Fast Refresh

@vitejs/plugin-react-swc
 uses SWC
 for Fast Refresh

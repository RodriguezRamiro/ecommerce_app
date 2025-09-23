# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **CartDrawer** component with:
  - Quantity increment/decrement controls
  - Remove item functionality
  - Animation using Framer Motion
- **ProductCard** component:
  - Image fallback for broken or missing images
  - Price formatting and default values
  - Add-to-cart button
- **ProductGrid** and **ProductList** components:
  - Flexible grid layouts
  - Optional title and item limit
  - Staggered animation for items
- **Button** component for reusable buttons with multiple variants
- **CartProvider** context (for future global cart state management)
- **Dark mode support** implemented in App component and CSS
- **Pages**:
  - Home
  - Shop
  - Cart
  - Checkout
  - NotFound (404)
- **Global styles** moved from Tailwind to custom CSS (`index.css` and component-specific styles)
- **Main entry point** (`main.jsx`) wraps App with `CartProvider` and `StrictMode`

### Changed
- Refactored App.jsx:
  - Cart operations (add, remove, update quantity) centralized
  - Cart drawer integrated globally
  - Dark mode toggle added
- Navbar updated to show current cart count
- Pages updated for consistent layout, styling, and component reuse
- Removed all Tailwind CSS classes, replaced with custom CSS
- Form inputs (Checkout page) updated with consistent styles and accessibility
- Buttons and links updated with hover/transition effects
- Product-related components standardized (cards, lists, grids)

### Fixed
- Broken image handling in ProductCard
- Cart total calculation
- Responsive layout issues across pages

### Removed
- Tailwind CSS dependencies and utility classes from all components
- Hard-coded inline styles where replaced with CSS modules or custom classes


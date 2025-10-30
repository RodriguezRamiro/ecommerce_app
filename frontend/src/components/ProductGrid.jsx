//frontend/src/components/ProductGrid.jsx


import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductCard from "./ProductCard";
import "./styles/ProductGrid.css";

const mockProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 99.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Stay connected with this sleek smart watch.",
    price: 199.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    description: "Ergonomic gaming mouse with customizable buttons.",
    price: 49.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "4K Monitor",
    description: "Ultra HD 4K monitor for stunning visuals.",
    price: 299.99,
    image: "https://via.placeholder.com/150",
  },
];

export default function ProductGrid({ onAddToCart }) {
  const [product, setProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
          console.log("loaded products from backend");
        } else {
          console.warn("Backend retruned no data, using mock");
          setUsingMock(true);
        }
      } catch (err) {
        console.warn("Backend unavailable, using mock data:", err.message);
        setUsingMock(true);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) {
    return <p className="loading-text">Loading Products...</p>
  }

  return (
    <section className="product-grid-section">
      <h2 className="product-grid-title">
        Products {usingMock && <span>(demo data)</span>}
        </h2>
        
      <div className="product-grid">
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}

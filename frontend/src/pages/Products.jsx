// frontend/src/pages/Products.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { fetchProducts } from "../utils/api"; //<<-----||| left off here
import "./styles/Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {addToCart } = useCart();

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();

        if (!data || data.length === 0){
           throw new Error("No products available at this time");
        }

        setProducts(data);
      } catch (err) {
        console.error("Product fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) return <p className="loading">Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="products-container">
      <h1>Shop All Products</h1>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/products/${product.id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="product-img"
              />
              <h2>{product.name}</h2>
              <p>${product.price}</p>
            </Link>
            <button
            className="add-to-cart-btn"
            onClick={() => {addToCart(product);
            alert(`${product.name} added to cart 🛒`)
            }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

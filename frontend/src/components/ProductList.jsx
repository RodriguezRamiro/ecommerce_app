//frontend/src/components/ProductList.jsx

import React from "react";
import ProductCard from "./ProductCard";

//example static data (to move into backend/api later)

const sampleProducts = [
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

  export default function ProductList() {
    return (
        <div className='container mx-auto p-6'>
            <h2 className='text-2xl front-bold mb-6'> Our Products</h2>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
                {sampleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
  }
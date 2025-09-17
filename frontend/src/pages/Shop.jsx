//src/pages/Shop.jsx

import React from 'react'
import ProductGrid from "../components/ProductGrid";

export default function Shop({ onAddToCart }) {
  return (
    <div className='max-w-6xl mx-auto py-10 px-6'>
        <h2 className='text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6'>
            Browse The Latest Products
        </h2>
        <p className='text-gray-600 dark:text-gray-300 mb-8'>
            Hand picked and curated items with you in mind.
        </p>

        {/* Product Grid */}
        <ProductGrid onAddToCart={onAddToCart} />
    </div>
  );
}

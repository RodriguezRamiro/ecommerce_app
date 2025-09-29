// frontend/src/pages/ProductDetail.jsx

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products';
import './styles/ProductDetail.css';

export default function ProductDetail({ onAddToCart}) {
    const { id } = useParams();                         // grab id;
    const product = products.find(p => p.id === Number(id)); // find product by id

    if (!product) {
        return (
            <div className='product-detail-container'>
            <h2> Product Not Found </h2>
            <Link to='/shop' className='black-button'>Back to Shop</Link>
            </div>
        );
    }
  return (
    <div className='product-detail-container'>
        <img src={product.image} alt={product.name} className='product-detail-img' />
        <div className='product-detail-info'>
            <h1>{product.name}</h1>
            <p className='product-detail-price'>${product.price}</p>
            <p className='product-detail-desc'>
                {product.description || 'This is a greate product!'}
            </p>
            <button
            className='add-to-cart-btn'
            onClick={() => onAddToCart(product)}
            >
                Add to Cart
            </button>
            <Link to='/shop' className='black-button'>← Back to Shop</Link>

        </div>
    </div>
  )
}

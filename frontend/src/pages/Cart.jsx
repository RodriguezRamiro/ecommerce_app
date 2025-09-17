//src/pages/Cart.jsx

import React from 'react'
import { Link } from 'react-router-dom';

export default function Cart({ cartItems }) {
    const total = cartItems.reduce((sum, item) => + item.price, 0);


  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Your Cart
      </h2>

            {cartItems.length === 0 ? (
                <p className='text-gray-600 dark:text-gray-300'>
                    Your cart is empty.{" "}
                    <Link to="/shop" className='text-blue-600 hover:underline'>
                    Go Shoping
                    </Link>
                </p>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-500">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {cartItems.map((item, idx) => (
                      <li key={idx} className="flex justify-between py-3">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-700 dark:text-gray-300">
                          ${item.price.toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>


          {/* Total */}
          <div className="flex justify-between items-center mt-6 font-semibold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Checkout button */}
          <div className="mt-6 text-right">
            <Link
              to="/checkout"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 hover:scale-105 transform transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

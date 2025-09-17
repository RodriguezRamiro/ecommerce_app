//src/pages/Checkout.jsx

import React from 'react'

export default function Checkout() {
  return (
    <div className='max-w-3xl mx-auto py-10 px-6'>
        <h2 className='text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6'>
            Checkout
            </h2>
        <p className='text-gray-600 dark:text-gray-300 mb-8'>
            Complete your purchase securly. Enter your details below.
            </p>

            <form className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-4 transition-colors duration-500'>
                {/* Nmae */}
                <div>
                    <label className='block text-sm font-medium mb-1'>Full Name</label>
                    <input
                    type='text'
                    placeholder='Your Name'
                    className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none'
                    />
                </div>

                {/* Email */}
                <div>
                    <label className='block text-sm font-medium mb-1'>Email</label>
                    <input
                    type='email'
                    placeholder='your@email.com'
                    className='w-full px4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none'
                    />
                </div>

                {/* Adress */}
                <div>
                    <label className="block text-sm font-medium mb-1">Adress</label>
                    <input
                    typu='text'
                    placeholder='123 Main St'
                    className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark: bg-gray-900 text-gray-800 dark:Text-gray200 focus:ring-2 focus:ring-blue-500 outline-none'
                    />
                </div>

                {/* Paymeny */}
                <div>
                    <label className='block text-sm font-medium mb-1'>Payment info</label>
                    <input
                    type='text'
                    placeholder="Card Number"
                    className='w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none'
                    />
                </div>

                {/* Submit */}
                <button
                type='submit'
                className='w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold fover:bg-blue-700 hover:scale-105 transform transition'
                >
                    Place Order
                </button>
            </form>
    </div>
  );
}

//src/pages/NotFound.jsx

import React from 'react'
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='min-h-[70vh] flex flex-col justify-center items-center text-center px-6'>
        <h1 className='text-6xl font-extrabold text-red-500 mb-4'>404</h1>
        <p className='text-lg tex-gray-700 dark:text-gray-300 mb-6'>
            Oops! The page you're lookinf for doesn't exist.
        </p>

        <div className='space-x-4'>
            <Link
            to='/'
            className='bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 hover:scale-105 transform transition'
            >
                Go Home
            </Link>
            <Link
            to='/shop'
            className='bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-5 py-3 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-105 transofrm transition'
            >
                Visit Shop
            </Link>
        </div>
    </div>
  );
}

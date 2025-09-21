//frontend/src/Button.jsx

import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({ children, to, onClick, variant = 'primary', className = "" }) {
    const base =
    "px-6 py-3 rounded-xl font-medium transition shadow-md hover: scale-105";
    const variants= {
        primary: "bg-gradient-to-r <from-blue-500 to-purple-600 text-white hover:to-blue-500",
        sucess:
                "bg-gradient-to-r from-green-500 to-teal-600 text-white hover:from-teal-600 hover:to-gree-500",
        neutral:
                "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200",
    };

    const classes = `${bases} ${variants[variant]} ${className}`;

    return to ? (
        <Link to={to} className={classes}>
            {children}
        </Link>
    ) : (
        <button onClick={onClick} className={classes}>
            {children}
        </button>
    );
}

//frontend/src/Button.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./styles/Button.css";

export default function Button({
    children,
    to,
    onClick,
    variant = "primary",
    className = "",
  }) {
    const base = "btn";
    const variants = {
      primary: "btn-primary",
      success: "btn-success",
      neutral: "btn-neutral",
    };

    const classes = `${base} ${variants[variant] || ""} ${className}`;

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

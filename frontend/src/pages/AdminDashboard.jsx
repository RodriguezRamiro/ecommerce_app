// frontend/src/components/AdminDashboard.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Admin.css";

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    })
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("adminToken");
      if(!token) {
        navigate("/admin/login");
        return;
      }

        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        setProducts(storedProducts);
    }, [navigate]);

    const saveProducts = (updated) => {
        setProducts(updated);
        localStorage.setItem("products", JSON.stringify(updated));
    };

    const handleAdd = () => {
        if (!newProduct.name || !newProduct.price) return;
        const updated = [...products, { id: Date.now(), ...newProduct }];
        saveProducts(updated);
        setNewProduct({ name: "", price: "", image: "" });
    };

    const handleDelete = (id) => {
        const updated = products.filter((p) => p.id !== id);
        saveProducts(updated);
    };

    const handleLogout = () => {
      localStorage.removeItem("adminToken");
      navigate("/");
    };


    return (
        <div className="admin-dashboard">
          <h1>Admin Dashboard</h1>

          {/* Add Product Form */}
          <div className="add-product">
            <input
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <input
              placeholder="Price"
              type="number"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <input
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />
            <button onClick={handleAdd}>Add Product</button>
          </div>

          {/* Product List */}
          <ul>
            {products.map((p) => (
              <li key={p.id}>
                <img src={p.image} alt={p.name} width="50" />
                <span>{p.name}</span> – ${p.price}
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </li>
            ))}
          </ul>

          <button onClick={handleLogout}>Logout</button>
        </div>
      );
    };

    export default AdminDashboard;
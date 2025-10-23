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
    const[error, setError] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("adminToken");

    // Redirect if no token
    useEffect(() => {
      if (!token) {
        navigate("/admin/login");
        return;
      }
      fetchProducts();
    }, [navigate, token]);

    // Fetch products from backend

    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/admin/products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }

    // Add products to backend
    const handleAdd = async () => {
        if (!newProduct.name || !newProduct.price) return;

        try {
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newProduct),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to add product");

        setProducts((prev) => [...prev, data]);
        setNewProduct({ name: "", price: "", image: ""});
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    // Delete product from backend
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete product");
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };


    const handleLogout = () => {
      localStorage.removeItem("adminToken");
      navigate("/admin/login");
    };


    return (
        <div className="admin-dashboard">
          <h1>Admin Dashboard</h1>
          {error && <p className="error">{error}</p>}

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
            {p.image && <img src={p.image} alt={p.name} width="50" />}
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
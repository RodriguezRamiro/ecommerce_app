// frontend/src/utils/api.js


const USE_MOCK = import.meta.env.VITE_USE_MOCK === "false";
const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

import mockProducts from "../data/products.js";  //local mock data



  /**
   * Helper for POST requests
  */

 async function postRequest(endpoint, data) {
   try {
     const res = await fetch(`${BASE_URL}${endpoint}`, {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      return { success: false, errors: errData.errors || ["Request failed"] };
    }

      return await res.json();
    } catch (err) {
      console.error(`Error posting to ${endpoint}:`, err);
      return { success: false, errors: ["Network error."] };
    }
  }

  /**
   * Contact Form
  */

 export async function submitContactForm(formData) {
  if (USE_MOCK) {
    console.log("Mock contact from submitted:", formData);
    return { status: "mock_success", received: formData };
  }
   return postRequest("/contact", formData);
  }

  /**
   * Order Creation
  */

 export async function createOrder(orderData) {
  if (USE_MOCK) {
    console.log("Mock order created:", orderData);
    return { status: "mock_sucess", order: orderData };
  }
   return postRequest("/orders", orderData);
  }

  /**
   * Fetch Products (optional future)
   */
  export async function fetchProducts() {
    if (USE_MOCK) {
      console.log("Using mock products data");
      return mockProducts;
    }

    try {
      const res = await fetch(`${BASE_URL}/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return await res.json();
    } catch (err) {
      console.error("fetchProducts error:", err);
      return [];
    }
  }


 /**
   * Feych sinle product by Id
  */
  export async function fetchProductById(id) {
    if (USE_MOCK) {
      return mockProducts.find((p) => p.id === Number(id));
    }

    try {
      const res = await fetch( `${BASE_URL}/products/${id}`);
      if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
      return await res.json();
    } catch (err) {
      console.error("fetchProductById error:", err);
      return null;
    }
  }

  /**
   * Health Check
  */
 export async function checkHealth() {
  if (USE_MOCK) return { status: "mock_online" };

  try {
    const res = await fetch(`${BASE_URL}/health/`);
    if (!res.ok) throw new Error("Health check failed");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Health check error:", err);
    return { status: "offline" };
  }
}
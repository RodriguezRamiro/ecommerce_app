// frontend/src/utils/api.js

const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";




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

      const result = await res.json();
      return result;
    } catch (err) {
      console.error(`Error posting to ${endpoint}:`, err);
      return { success: false, errors: ["Network error."] };
    }
  }

  /**
   * Contact Form
  */

 export async function submitContactForm(formData) {
   return postRequest("/contact", formData);
  }

  /**
   * Order Creation
  */

 export async function createOrder(orderData) {
   return postRequest("/order", orderData);
  }

  /**
   * Fetch Products (optional future)
   */
  export async function fetchProducts() {
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
   * Health Check
  */
 export async function checkHealth() {
   try {
     const res = await fetch(`${BASE_URL}/health`);
     if (!res.ok) throw new Error("Health check failed");
     return await res.json();
    } catch (err) {
      console.error("Health check error:", err);
      return { status: "offline" };
    }
  }
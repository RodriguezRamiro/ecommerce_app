// frontend/src/utils/api.js

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";




/**
 * Response handler
 *
 */

async function handleResponse(res) {
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData?.error || "Request failed");
    }
    return res.json();
  }

/**
 * Fetch all products
 *
 */


export async function fetchProducts() {
    const res = await fetch(`${API_BASE}/products`);
    return handleResponse(res);

}

/**
 * Submit contact form
 */

export async function submitContactForm(data) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData?.errors?.join(", ") || "Failed to submit contact form");
  }

  return res.json();
}

/**
 * Health check
 */

export async function checkHealth() {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error("Health check failed");
    return res.json();
  }

  export default API_BASE;

  /**
 * Create a new order
 * @param {Object} orderData
 */

  export async function createOrder(orderData) {
    const res = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    return handleResponse(res);
  }
/**
 * Fetch all orders
 */

export async function fetchOrders() {
    const res = await fetch(`${API_BASE}/orders`);
    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
}
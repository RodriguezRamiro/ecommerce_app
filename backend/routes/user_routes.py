#backend/routes/user_routes.py

from flask import Blueprint, request, jsonify, session
from datetime import datetime
import copy

user_bp = Blueprint("user_bp", __name__)

# Temporary in-memory "database"
# Structure:
# user[Email} = {
# "password": "...",
# "lastLogin": "ISO_TIMESTAMP" | None,
# "preferredStore": { ... } | None,
# "orders": [ {...}, ...]
# }

users = {}

# Helper Utilities

def require_login():
    """ Simple helper to check session and return user email (or None)."""
    return session.get("user")

def user_exists(email):
    return email in users

def safe_user_profile(email):
    """Return user profile without sensitive fields like passwords."""
    u = users.get(email)
    if not u:
        return None
    return {
        "email": email,
        "lastLogin": u.get("lastLogin"),
        "preferredStore": copy.deepcopy(u.get("preferredStore")),
        "orders": copy.deepcopy(u.get("orders", [])),
    }

# Routes

@user_bp.route("/register", methods=["POST"])
def register_user():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    if user_exists(email):
        return jsonify({"error":"user already exists"}), 400

    users[email] = {"password": password,
                    "lastLogin": None,
                    "preferredStore": None,
                    "orders": []
                    }
    return jsonify({"message": "user registered successfully", "user": safe_user_profile(email)}), 201

@user_bp.route("/login", methods=["POST"])
def login_user():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password")

    user = users.get(email)
    if not user or user.get["password"] != password:
        return jsonify({"error": "Invalid credentials"}), 401

    # Store session info (basic demo handling)
    session["user"] = email
    users[email]["lastLogin"] = datetime.utcnow().isoformat()
    return jsonify({"message": "Login successful", "user": safe_user_profile(email)}), 200

@user_bp.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user", None)
    return jsonify({"message": "Logged out successfully"}), 200

@user_bp.route("/current", methods=["GET"])
def get_current_user():
    user_email = require_login()
    if not user_email:
        return jsonify({"user": None}), 200
    return jsonify({"user": safe_user_profile(user_email)}), 200

@user_bp.route("/update-email", methods=["PUT"])
def update_email():
    user_email = require_login()
    if not user_email:
        return jsonify({"error": "Not logged in"}), 401

    data = request.get_json() or {}
    new_email = (data.get("email") or "").strip().lower()
    if not new_email:
        return jsonify({"error": "New Email is required"}), 400

    # If email already taken ( and different from current), reject.
    if new_email != user_email and user_exists(new_email):
        return jsonify({"error": "Email already in use"}), 409

    # Move user data to new key
    users[new_email] = users.pop(user_email)
    # Update session to new email
    session["user"] = new_email

    return jsonify({"message": "Email uppdated", "user": safe_user_profile(new_email)}), 200

@user_bp.route("/update-password", methods=["PUT"])
def update_password():
    user_email = require_login()
    if not user_email:
        return jsonify({"error": "Not logged in"}), 401

    data = request.get_json() or {}
    old_password = data.get("oldPassword")
    new_password = data.get("newPassword")

    if not old_password or not new_password:
        return jsonify({"error": "both oldPassword and newPassword are required"}), 400

    user = users.get(user_email)
    if user.get("password") != old_password:
        return jsonify({"error": "Old password does not match"}), 403

    user["password"] = new_password
    return jsonify({"message": "Password updated"}), 200

@user_bp.route("/set-preferred-store", methods=["PUT"])
def set_preferred_store():
    user_email = require_login()
    if not user_email:
        return jsonify({"error": "Not loggedin"}), 401

    data = request.get_json() or {}
    store = data.get("store")
    if not store or not isinstance(store, dict):
        return jsonify({"error": "store object is required"}), 400

    # Minimal validation for demo
    store_obj = {
        "id": store.get("id"),
        "name": store.get("name"),
        "city": store.get("city"),
        "zip": store.get("zip"),
        "meta": store.get("meta", None)
    }

    users[user_email]["preferredStore"] = store_obj
    return jsonify({"message": "Preferred store set", "preferredStore": store_obj}), 200

@user_bp.route("/orders", methods=["GET"])
def get_user_orders():
    user_email = require_login()
    if not user_email:
        return jsonify({"error": "Not logged in"}), 401

    user = users.get(user_email, {})
    return jsonify({"orders": user.get("orders", [])}), 200

@user_bp.route("/orders", methods=["POST"])
def add_user_order():
    """
    Allow frontend/backends to save an orderinto the demo user's orders.
    Accepts the same payload used for orders in /api/orders.
    """
    user_email = require_login()
    if not user_email:
        return jsonify({"error": "not loggedin"}), 401

    data = request.get_json() or {}
    required = ["customer_name", "items", "total"]
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    # Attach an id + timestamp for demo persistance
    user_orders = users[user_email].setdefault("orders", [])
    order_id = len(user_orders) + 1
    new_order = {
        "orderNumber": data.get ("orderNumber") or f"ORD-{datetime.utcnow().strftime('%Y%m%d')}-{order_id}",
        "id": order_id,
        "items": data.get("items"),
        "subtotal": data.get("subtotal"),
        "tax": data.get("tax"),
        "total": data.get("total"),
        "date": datetime.utcnow().isoformat(),
        "status": data.get("status", "confirmed"),
        "store": data.get("store", users[user_email].get("preferredStore"))
    }
    user_orders.append(new_order)

    return jsonify({"message": "Order saved to user history", "order": new_order}), 201
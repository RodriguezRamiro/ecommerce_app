# //backend/routes/orders.py

from flask import Blueprint, jsonify, request
from pathlib import Path
import json
import uuid

orders_bp = Blueprint("orders", __name__)

# Path to orders.json
ORDERS_FILE = Path(__file__).resolve().parent.parent / "data" / "orders.json"

@orders_bp.route("/", methods=["POST"])
def create_order():
    """Handle order creation."""
    data = request.get_json() or {}

    # Validate required fields
    required = ["customer_name", "items", "total"]
    missing = [field for field in required if not data.get(field)]
    if missing:
        return jsonify({"status": "error", "error": f"Missing fields: {', '.join(missing)}"}), 400

    # Assign a unique ID to the order
    data["id"] = str(uuid.uuid4())

    # Load existing orders
    orders = []
    if ORDERS_FILE.exists():
        try:
            with ORDERS_FILE.open() as f:
                orders = json.load(f)
        except json.JSONDecodeError:
            orders = []

    # Append new order and save
    orders.append(data)
    with ORDERS_FILE.open("w") as f:
        json.dump(orders, f, indent=2)

    return jsonify({"status": "success", "order": data}), 201


@orders_bp.route("/", methods=["GET"])
def get_orders():
    """Retrieve all orders."""
    if not ORDERS_FILE.exists():
        return jsonify([])

    try:
        with ORDERS_FILE.open() as f:
            orders = json.load(f)
    except json.JSONDecodeError:
        orders = []

    return jsonify(orders)

# //backend/routes/orders.py

from flask import Blueprint, jsonify, request
from pathlib import Path
import json
import uuid

orders_bp = Blueprint("orders", __name__)



@orders_bp.route("/", methods=["POST"])
def create_order():
    """Handle order creation."""
    data = request.get_json() or {}

    # Add an order ID
    data["id"] = str(uuid.uuid4())


    required = ["customer_name", "items", "total"]
    missing = [f for f in required if f not in data or not data[f]]

    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    orders_path = Path(__file__).resolve().parent.parent / "data" / "orders.json"
    orders = []

    if orders_path.exists():
        with orders_path.open()as f:
            orders = json.load(f)

    orders.append(data)

    with orders_path.open("w") as f:
        json.dump(orders, f, indent=2)

    return jsonify({"status": "success", "order": data}), 201


@orders_bp.route("/", methods=["GET"])
def get_orders():
    """Retrieve all orders."""
    orders_path = Path(__file__).resolve().parent.parent / "data" / "orders.json"

    if not orders_path.exists():
        return jsonify([])

    with orders_path.open() as f:
        orders = json.load(f)

    return jsonify(orders)
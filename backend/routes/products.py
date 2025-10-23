# //backend/routes/products.py

from flask import Blueprint, jsonify
from pathlib import Path
import json

# Blueprint
products_bp = Blueprint("products", __name__)

#Path to products.json
PRODUCTS_FILE = Path(__file__).resolve().parent.parent / "data" / "products.json"


@products_bp.route("/", methods=["GET"])
def get_products():
    """Serve mock products from local JSON file."""
    if not PRODUCTS_FILE.exists():
        return jsonify({"error": "Products data not found"}), 404

    try:
        with PRODUCTS_FILE.open() as f:
            products = json.load(f)
    except json.JSONDecodeError:
        return jsonify({"error": "Products file is corrupted"}), 500

    return jsonify(products)

@products_bp.route("/<int:product_id>", methods=["GET"])
def get_product(product_id):
    """FEtch a single product by its ID."""
    if not PRODUCTS_FILE.exists():
        return jsonify({"error": "Products data not found"}), 404
    try:
        with PRODUCTS_FILE.open() as f:
            products = json.load(f)
    except json.JSONDecodeError:
        return jsonify({"error": "Products file is corrupted"}), 500

    # Find product by ID
    product = next((p for product in products if p.get("id") == product_id), None)
    if not product:
        return jsonify({"error": f"Product with ID {product_id} not found"}), 404
    return jsonify(product)
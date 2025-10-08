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
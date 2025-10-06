# //backend/routes/products.py

from flask import Blueprint, jsonify
from pathlib import Path
import json

products_bp = Blueprint("products", __name__)


@products_bp.route("/", methods=["GET"])
def get_products():
    """Serve mock products from local JSON file"""
    products_path = Path(__file__).resolve().parent.parent / "data" / "products.json"

    if not products_path.exists():
        return jsonify({"error": "Products data not found"}), 400

    with products_path.open() as f:
        products = json.load(f)

        return jsonify(products)
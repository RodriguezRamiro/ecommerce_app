# //backend/routes/products.py

from flask import Blueprint, jsonify
from pathlib import Path
import json

# Blueprint
products_bp = Blueprint("products", __name__)

#Path to products.json
PRODUCTS_FILE = Path(__file__).resolve().parent.parent / "data" / "products.json"

def ensure_products_file():
    """Ensure products.json exists and is a valid list."""
    if not PRODUCTS_FILE.exists():
        PRODUCTS_FILE.parent.mkdir(parents=True, exists_ok=True)
        with PRODUCTS_FILE.open("w") as f:
            json.dump([], f)
        print("Created Missing products.json file")

    else:
        try:
            with PRODUCTS_FILE.open() as f:
                data = json.load(f)
            if not isinstance(data, list):
                raise ValueError("Not a list")
        except Exception:
             # Recreate a valid empty list
            with PRODUCTS_FILE.open("w") as f:
                json.dump([], f)
            print("Recreated corrupted products.json file")


@products_bp.route("/", methods=["GET"])
def get_products():
    """Serve mock products from local JSON file."""
    ensure_products_file()

    try:
        with PRODUCTS_FILE.open() as f:
            products = json.load(f)
    except json.JSONDecodeError:

        return jsonify(products), 200

@products_bp.route("/<int:product_id>", methods=["GET"])
def get_product(product_id):
    """Fetch a single product by its ID."""
    ensure_products_file()

    with PRODUCTS_FILE.open() as f:
            products = json.load(f)

    # Find product by ID
    product = next((p for p in products if str(p.get("id")) == product_id), None)
    if not product:
        return jsonify({"error": f"Product with ID {product_id} not found"}), 404

    return jsonify(product), 200

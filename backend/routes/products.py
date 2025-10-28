# //backend/routes/products.py

from flask import Blueprint, jsonify, request
from pathlib import Path
import json
from utils.validators import validate_product_data


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

# Read all products

@products_bp.route("/", methods=["GET"])
def get_products():
    """Return all Products."""
    ensure_products_file()

    try:
        with PRODUCTS_FILE.open() as f:
            products = json.load(f)
        return jsonify(products), 200,
    except Exception as e:
        return jsonify({"error": f"failed to load products: {str(e)}"}), 500

# Read Single Prodduct

@products_bp.route("/<int:product_id>", methods=["GET"])
def get_product(product_id):
    """Fetch a single product by its ID."""
    ensure_products_file()

    try:
        with PRODUCTS_FILE.open() as f:
            products = json.load(f)
    except Exception as e:
        return jsonify({"error": f"Failed to read products file {str(e)}"}), 500

    # Find product by ID
    product = next((p for p in products if p.get("id") == product_id), None)
    if not product:
        return jsonify({"error": f"Product with ID {product_id} not found"}), 404

    return jsonify(product), 200


# Create Product

@products_bp.route("/", methods=["POST"])
def add_product():
    """ Add a new product."""
    ensure_products_file()
    data = request.get_json() or {}


    # Validate product input
    errors = validate_product_data(data)
    if errors:
        return jsonify({"errors": errors}), 400

    try:
        with PRODUCTS_FILE.open() as f:
            products = json.load(f)

        new_id = max([p.get("id", 0) for p in products], default=0) + 1
        new_product = {"id": new_id, **data}
        products.append(new_product)

        with PRODUCTS_FILE.open("w") as f:
            json.dump(products, f, indent=2)

        print(f"Added new product: {new_product}")
        return jsonify(new_product), 201

    except Exception as e:
        return jsonify({"error": f"field to add product: {str(e)}"}), 500

# Update Product

@products_bp.route("/<int:product_id>", methods=["PUT"])
def update_product(product_id):
    """Update an existing product by ID."""
    ensure_products_file()
    data = request.get_json() or {}

      # Validate updated fueld (partial update allowed)
    errors = validate_product_data(data, partial=True)
    if errors:
        return jsonify({"errors": errors}), 400

    try:
        with PRODUCTS_FILE.open() as f:
            products = json.load(f)

        for product in products:
            if product.get("id") == product_id:
                product.update(data)
                with PRODUCTS_FILE.open("w") as f:
                    json.dump(products, f, indent=2)
                print(f"Updated product {product_id}: {product}")
                return jsonify(p), 200

        return jsonify({"error": f"Product with ID {product_id} not found"}), 400

    except Exception as e:
        return jsonify({"errro": f"Failed to update product: {str(e)}"}), 500

# Delete Product

@products_bp.route("/<int:product_id>", methods= ["DELETE"])
def delete_product(product_id):
    """Delete a product by ID."""
    ensure_products_file()

    try:
        with PRODUCTS_FILE.open() as f:
            products = json.load(f)

        new_products= [p for p in products if p.get("id") != product_id]

        if len(new_products) == len(products):
            return jsonify({"error": f"Product with ID {product_id} not found"}), 404

        with PRODUCTS_FILE.open("w") as f:
            json.dump(new_products, f, indent=2)

        print(f"Deleted product {product_id}")
        return jsonify({"status": "deleted", "id": product_id}), 200

    except Exception as e:
        return jsonify({"error": f"Failed to delete product: {str(e)}"}), 500
# //backend/routes/admin_routes.py

from flask import Blueprint, request, jsonify
import jwt
import datetime
from functools import wraps
from data.utils.file_manager import load_json, save_json
import uuid


# Create Blueprint
admin_bp = Blueprint('admin', __name__)

# Secret key for JWT Move it into a config file or enviroment variable
SECRET_KEY = 'super-secret-key'

# temporary hardcoded credentials (for dev/demo)
ADMIN_USERNAME = 'admin'
ADMIN_PASSWORD = 'password123'

# Helper: Token required decorator
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({"error": "Missing token"}), 401
        try:
            token = auth_header.split(" ")[1]
            jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        return f(*args, **kwargs)
    return decorated


# POST /api/admin/login
@admin_bp.route('/login', methods=['POST'])
def login():
    data = request.json or {}
    username = data.get('username')
    password = data.get('password')

    if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
        token = jwt.encode(
            {
                "user": username,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2)
            },
            SECRET_KEY,
            algorithm="HS256"
        )
        return jsonify({"token": token}), 200

    return jsonify({"error": "Invalid credentials"}), 401


# GET /api/admin/dashboard (protected)
@admin_bp.route('/dashboard', methods=['GET'])
@token_required
def dashboard():
    return jsonify({
        "message": "Welcome to the admin Dashboard",
        "status": "authorized"
    }), 200


# PRODUCT ROUTES
@admin_bp.route('/products', methods=['GET'])
@token_required
def get_products():
    products = load_json("products.json")
    return jsonify(products), 200


@admin_bp.route('/products', methods=['POST'])
@token_required
def add_product():
    data = request.json or {}
    required = ["name", "price", "image"]
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    products = load_json("products.json")
    data["id"] = str(uuid.uuid4())
    products.append(data)
    save_json("products.json", products)
    return jsonify(data), 201


@admin_bp.route('/products/<product_id>', methods=['DELETE'])
@token_required
def delete_product(product_id):
    products = load_json("products.json")
    updated = [p for p in products if p.get("id") != product_id]
    if len(updated) == len(products):
        return jsonify({"error": "Product not found"}), 404
    save_json("products.json", updated)
    return jsonify({"status": "success"}), 200
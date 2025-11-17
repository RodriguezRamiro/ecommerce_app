# //backend/app.py

from flask import Flask, jsonify, request
from backend.routes.admin_routes import admin_bp
from flask_session import Session
from flasgger import Swagger
from flask_cors import CORS
from pathlib import Path
import json

# Create app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'super-secret-key'

CORS(app, supports_credentials=True)
swagger = Swagger(app)

# Import Blueprints
from backend.routes.admin_routes import admin_bp
from backend.routes.products import products_bp
from backend.routes.contact import contact_bp
from backend.routes.orders import orders_bp
from backend.routes.health import health_bp
from backend.routes.user_routes import user_bp

# Register Blueprints
app.register_blueprint(products_bp, url_prefix="/api/products")
app.register_blueprint(contact_bp, url_prefix="/api/contact")
app.register_blueprint(orders_bp, url_prefix="/api/orders")
app.register_blueprint(health_bp, url_prefix="/api/health")
app.register_blueprint(admin_bp, url_prefix="/api/admin")
app.register_blueprint(user_bp, url_prefix="/api/users")

# Base Route
@app.route("/")
def home():
    return jsonify({"message": "Welcome to Rodriguez Code Solutions E-Shop API!"})


# Contact Form (if not in blueprint)
@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json() or {}
    required = ["name", "email", "message"]
    missing = [f for f in required if not data.get(f, "").strip()]

    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    messages_path = Path(__file__).parent / "data" / "messages.json"
    messages = []

    if messages_path.exists():
        with messages_path.open() as f:
            messages = json.load(f)

    messages.append(data)
    with messages_path.open("w") as f:
        json.dump(messages, f, indent=2)

    print("Received contact message:", data)
    return jsonify({"status": "success", "received": data}), 201


# Orders (if not in blueprint)
@app.route("/api/orders", methods=["POST"])
def create_order():
    data = request.get_json() or {}
    required = ["customer_name", "items", "total"]
    missing = [f for f in required if not data.get(f)]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    orders_path = Path(__file__).parent / "data" / "orders.json"
    orders = []

    if orders_path.exists():
        with orders_path.open() as f:
            orders = json.load(f)

    data["id"] = len(orders) + 1
    orders.append(data)

    with orders_path.open("w") as f:
        json.dump(orders, f, indent=2)

    print("New order received:", data)
    return jsonify({"status": "success", "order": data}), 201


# Catch-all for SPA routing
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    return app.send_static_file("index.html")


if __name__ == "__main__":
    app.run(debug=True, port=5000)

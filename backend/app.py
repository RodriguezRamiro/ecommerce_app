from flask import Flask, jsonify, request
from pathlib import Path
from flask_cors import CORS
import json

# Create app
app = Flask(__name__)
CORS(app) # allow frontend to reach backend

# Import Blueprints
from routes.products import products_bp
from routes.contact import contact_bp
from routes.orders import orders_bp
from routes.health import health_bp

# Register Bluprints
app.register_blueprint(products_bp, url_prefix="/api/products")
app.register_blueprint(contact_bp, url_prefix="/api/contact")
app.register_blueprint(orders_bp, url_prefix="/api/orders")
app.register_blueprint(health_bp, url_prefix="/api/health")



@app.route("/")
def home():
    return jsonify({"message": "Welcome to Rodriguez Code Solutions E-Shop API!"})

@app.route("/api/health")
def healt_check():
    """Return simple API health info."""
    return jsonify({
        "status": "ok",
        "version": "1.0.0",
        "message": "Backend is running",
    })

@app.route("/api/products")
def get_products():
    """Serve Mock Products from local JSON file."""
    products_path = Path(__file__).parent / "data" / "products.json"

    if not products_path.exists():
        return jsonify({"error": "Products data not found"}), 404

    # Load JSON data
    with products_path.open() as f:
        products = json.load(f)

    return jsonify(products)

####################################################
# DataBase query for production ready
# @app.route("/api/products")
# def get_products_db():
#   products = Products.query.all()
#    return jsonify([p.to_dict() for p in products])
####################################################


@app.route("/api/contact", methods=["POST"])
def contact():
    """ Handle contact form submissions."""
    data = request.get_json() or {}

    #validate required fields
    required = ["name", "email", "message"]
    missing = [field for field in required if field not in data or not data[field].strip()]

    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400


    # Placeholder: simulate saving or sending
    message_path = Path(__file__).parent / "data" / "messages.json"
    messages = []

    if messages_path.exists():
        with messages_path.open() as f:
            messages = json.load(f)

    messages.append(data)

    with messages_path.open("w") as f:
        json.dump(messages, f, indent=2)

        print("Recieved contact message:", data)

    # Save to DB or Send Email
    return jsonify({"status": "success", "received": data}), 201





@app.route("/api/orders", methods=["POST"])
def create_order():
    """Simulate creating an order."""
    data = request.get_json() or {}
    required = ["customer_name", "items", "total"]

    missing = [f for f in required if f not in data or not data[f]]
    if missing:
        return jsonify({"error": f"Missing fields:{', '.join(missing)}"}), 400

    order_path = PAth(__file__).parent / "data" / "orders.json"
    order = []

    if orders_path.exists():
        with orders_path.open() as f:
            orders = json.load(f)

    data["id"] = len(orders) + 1
    orders.append(data)

    with orders_path.open(w) as f:
        json.dump(orders, f indent=2)

        return jsonify({"status": "sucess", "order": data}), 2001



if __name__ == "__main__":
    app.run(debug=True, port=5000)
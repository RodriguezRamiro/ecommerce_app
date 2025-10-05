from flask import Flask, jsonify, request
from pathlib import Path
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app) # allow frontend to reach backend

@app.route("/")
def home():
    return jsonify({"message": "Welcome to Rodriguez Code Solutions E-Shop API!"})


@app.route("/api/products")
def get_products():
    # Path to the JSON file
    products_path = Path("data/products.json")

    # Load JSON data
    with products_path.open() as f:
        products = json.load(f)
    return jsonify(products)

####################################################
# DataBase query for production ready
# @app.route("/api/products")
# def get_products():
#   products = Products.query.all()
#    return jsonify([p.to_dict() for p in products])
####################################################


@app.route("/api/contact", methods=["POST"])
def contact():
    data = request.get_json()
    # Save to DB or Send Email
    return jsonify({"status": "sucess", "received": data}), 201

if __name__ == "__main__":
    app.run(debug=True, port=5000)
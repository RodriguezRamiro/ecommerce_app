# //backend/routes/stores.py

from flask import Blueprint, jsonify
from backend.data.utils.file_manager import load_json

stores_bp = Blueprint("stores", __name__)

STORES_FILE = "stores.json"

def _stores_path():
    return STORES_FILE

@stores_bp.route("/", methods=["GET"])
def get_stores():
    stores = load_json(_stores_path())
    return jsonify({"stores": stores}), 200

@stores_bp.route("/<int:stores_id>", methods=["GET"])
def get_store(store_id):
    stores = load_json(_stores_path())
    store = next((s for s in stores if s.get("id") == store_id), None)

    if not store:
        return jsonify({
            "status": "error",
            "error": f"Store with ID {store_id} not found"
        }), 400

    return jsonify({"status": "success", "store": store}), 200

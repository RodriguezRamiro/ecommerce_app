# //bakcend/routes/health.py

from flask import Blueprint, jsonify

health_bp = Blueprint("health", __name__)

@health_bp.route("/", methods=["GET"])
def health_check():
    """Return simple API health info."""
    return jsonify({"status": "OK", "messages": "API is running"})


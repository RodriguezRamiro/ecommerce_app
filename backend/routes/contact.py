# //backend/routes/contact.py

from flask import Blueprint, jsonify, request
from utils.validators import validate_contact_form
from pathlib import Path
import json

contact_bp = Blueprint("contact", __name__)

@contact_bp.route("/", methods=["POST"])
def handle_contact():
    """Handle contact form submission."""
    data = request.get_json() or {}

    # Validate input
    errors = validate_contact_form(data)
    if errors:
        return jsonify({"status": "error", "errors": errors}), 400

    # Save messages locally
    messages_path = Path(__file__).resolve().parent.parent / "data" / "messages.json"

    # Load existing messages
    messages = []
    if messages_path.exists():
        with messages_path.open() as f:
            messages = json.load(f)

    messages.append(data)

    with messages_path.open("w") as f:
        json.dump(messages, f, indent=2)

    return jsonify({"status": "success", "message": "Contact form saved"}), 201
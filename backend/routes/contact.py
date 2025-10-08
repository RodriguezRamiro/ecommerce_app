# //backend/routes/contact.py

from flask import Blueprint, jsonify, request
from utils.validators import validate_contact_form
from pathlib import Path
import json

contact_bp = Blueprint("contact", __name__)

# Path to messages.json
MESSAGES_FILE = Path(__file__).resolve().parent.parent / "data" / "messages.json"

@contact_bp.route("/", methods=["POST"])
def handle_contact():
    """Handle contact form submission."""
    data = request.get_json() or {}

    # Validate input
    errors = validate_contact_form(data)
    if errors:
        return jsonify({"status": "error", "errors": errors}), 400

    # Load existing messages
    messages = []
    if MESSAGES_FILE.exists():
        try:
            with MESSAGES_FILE.open() as f:
                messages = json.load(f)
        except json.JSONDecodeError:
            # If file is corrupted, start fresh
            messages = []

    # Append new message
    messages.append(data)

    # Save updated messages
    with MESSAGES_FILE.open("w") as f:
        json.dump(messages, f, indent=2)

    return jsonify({"status": "success", "message": "Contact form saved"}), 201

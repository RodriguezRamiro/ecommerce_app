# backend/routes/contact.py

from flask import Blueprint, jsonify, request
from backend.data.utils.file_manager import load_json, save_json
from backend.data.utils.validators import validate_contact_form

contact_bp = Blueprint("contact", __name__)

@contact_bp.route("/", methods=["POST"])
def handle_contact():
    """Handle contact form submission."""
    data = request.get_json() or {}

    #  Validate input
    errors = validate_contact_form(data)
    if errors:
        return jsonify({"status": "error", "errors": errors}), 400

    #  Load existing messages (or empty list if none)
    messages = load_json("messages.json")

    #  Add the new message
    messages.append(data)

    #  Save it back
    save_json("messages.json", messages)

    #  Respond
    return jsonify({"status": "success", "message": "Contact form saved"}), 201

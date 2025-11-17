#backend/routes/user_routes.py

from flask import Blueprint, request, jsonify, session

user_bp = Blueprint("user_bp", __name__)

# Temporary in-memory "database"
users = {}

@user_bp.route("/register", methods=["POST"])
def register_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    if email in users:
        return jsonify({"error":"user already exists"}), 400

    users[email] = {"password": password}
    return jsonify({"message": "user registered successfully"}), 201

@user_bp.route("/login", methods=["POST"])
def login_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = users.get(email)
    if not user or user["password"] != password:
        return jsonify({"error": "Invalid credentials"}), 401

    # Store session info (basic demo handling)
    session["user"] = email
    return jsonify({"message": "Login successful", "user": {"email": email}}), 200

@user_bp.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user", None)
    return jsonify({"message": "Logged out successfully"}), 200

@user_bp.route("/current", methods=["GET"])
def get_current_user():
    user_email = session.get("user")
    if not user_email:
        return jsonify({"user": None}), 200
    return jsonify({"user": {"email": user_email}}), 200
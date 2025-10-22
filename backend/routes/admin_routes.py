# //backend/routes/admin_routes.py

from flask import Blueprint, request, jsonify
import jwt
import datetime
from functools import wraps


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
    def decorated(*args, &&kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({"error": "Missing Token"}), 401

        try:
            token = auth_header.split(" ")[1]
            jwt.deode(token, SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "token expired"}), 401

        return f(*args, **kwargs)
    return decorated

# Post api/admin/login
@admin_bp.route('/login', methods=['POST'])
def lofin():
    data = request.json or {}
    username = data.get('username')
    password = data.get('password')

    if username == ADMIN_PASSWORD and password == ADMIN_PASSWORD:
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

# Get /api/admin/dashboard (protected)
@admin_bp.route('/dashboard', methods=['GET'])
@token_required
def dashboard():
    return jsonify({ "message": "Welcome to the admin Dashboard",
                    "status": "authorized"
                    }), 200


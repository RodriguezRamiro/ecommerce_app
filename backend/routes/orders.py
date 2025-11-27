# backend/routes/orders.py

from flask import Blueprint, jsonify, request
from datetime import datetime
from backend.data.utils.file_manager import load_json, save_json
import uuid
import os

orders_bp = Blueprint("orders", __name__)

# Allowed fields to be updated
ALLOWED_FIELDS = {
    "customer_name",
    "items",
    "total",
    "status",
    "subtotal",
    "tax",
    "store",
    "email",
    "address",
    "orderNumber"
    }

MAX_LIMIT = 100 # Avoid huge responses

ORDERS_FILE = "orders.json"


def _orders_path():
    """ Files are referenced relaive to backend/data/ by the file_manager helpers,
    ensure the same constant is used as the helper. if file_manager uses abase path, rely on it.
    """
    return ORDERS_FILE

def _generate_order_number():
    # e.g. ORD-20251126-<6digit>
    date_part = datetime.utcnow().strftime("%Y%m%d")
    rand_part = str(uuid.uuid4().int)[:6]
    return f"ORD-{date_part}-{rand_part}"



@orders_bp.route("/", methods=["POST"])
def create_order():
    """Create an order. Accepts a flixible payload:
    required: custumer_name, items (array), subtotal(number)
    optional: email, address, paymnet (mock), orderNumber, created_at,
    store, status. Server will compute taxt & total and persist the order."""

    data = request.get_json() or {}

    # Validate required fields
    required = ["customer_name", "items", "subtotal"]
    missing = [field for field in required if not data.get(field) and data.get(field) != 0]
    if missing:
        return jsonify({
            "status": "error",
            "error": f"Missing fields: {', '.join(missing)}"}), 400
    try:
        subtotal = float(data.get("subtotal"))
    except (TypeError, ValueError):
        return jsonify({"status": "error", "error": "Invalid subtotal value"}), 400

    # Recalculate tax and total server-side
    tax_rate = 0.07
    tax = round(subtotal * tax_rate, 2)
    total = round(subtotal + tax, 2)

    # Load existing orders
    orders = load_json(_orders_path())

    # Auto increment numeric ID
    new_id = max([o.get("id", 0) for o in orders], default=0) + 1

    # Prepare normalize order object
    order = {
        "id": new_id,
        "orderNumber": data.get("orderNumber") or _generate_order_number(),
        "customer_name": data.get("customer_name"),
        "email": data.get("email"),
        "address": data.get("address"),
        # payment info should not be stored in plaintext for a real app; keep only mock marker
        "payment": "mock" if data.get("payment") else None,
        "items": data.get("items"),
        "subtotal": round(subtotal, 2),
        "tax": tax,
        "total": total,
        "status": data.get("status", "pending"),
        "data": data.get("created_at") or datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
        "store": data.get("store") or None,
    }

    orders.append(order)
    save_json(_orders_path(), orders)

    return jsonify({"status": "success", "order": order}), 201



@orders_bp.route("/", methods=["GET"])
def get_orders():
    """
    Retrieve all orders with pagination and optional status filter.
    GET /api/orders?page=1&limit=10&status=pending
    """

    # parse & validate query params
    try:
        page = int(request.args.get("page", 1))
        limit = int(request.args.get("limit", 10))
    except ValueError:
        return jsonify({"status": "error", "error": "`page` and `limit` must be integers."}), 400

    if page < 1 or limit < 1:
        return jsonify({"status": "error", "error": "`page` and `limit`must be positive integers."}), 400

    if limit > MAX_LIMIT:
        return jsonify({"status": "error", "error": f"`limit` cannot exceed {MAX_LIMIT}."}), 400

    # load and optionallly filter
    orders = load_json(_orders_path())
    status_filter = request.args.get("status")
    if status_filter:
        orders = [o for o in orders if str(o.get("status")) == status_filter]

    total = len(orders)
    total_pages = (total + limit - 1) // limit if total else 1

    start = (page - 1) * limit
    end = start + limit
    page_items = orders[start:end]

    meta = {
        "page": page,
        "limit": limit,
        "total": total,
        "total_pages": total_pages,
        "has_prev": page > 1,
        "has_next": page < total_pages
    }

    response = jsonify({"meta": meta, "orders": page_items})
    response.headers["X-Total_Count"] = str(total)
    return response, 200


@orders_bp.route("/<int:order_id>", methods=["GET"])
def get_order_by_id(order_id):
    """Retrieve a single order by ID."""
    orders = load_json(_orders_path())
    # Look for the order with matching ID
    order = next((o for o in orders if o.get("id") == order_id), None)
    if not order:
        return jsonify({
            "status": "error",
            "error": f"Order with ID {order_id} not found"
        }), 404

    return jsonify({"status": "success", "order": order}), 200


@orders_bp.route("/<int:order_id>", methods=["PUT"])
def update_order(order_id):
    """Update an existing order (only ALLOWED_FIELDS)."""
    updated_data = request.get_json() or {}
    invalid_fields = [f for f in updated_data.keys() if f not in ALLOWED_FIELDS]

    if invalid_fields:
        return jsonify({"status": "error",
                        "error": f"Invalid fields in update:{', '.join(invalid_fields)}"}), 400


    orders = load_json(_orders_path())

    for idx, order in enumerate(orders):
        if order.get("id") == order_id:
            #Only update allowed fields
            for key, value in updated_data.items():
                if key in ALLOWED_FIELDS:
                    orders[idx][key] = value

            save_json(_orders_path(), orders)
            return jsonify({
                "status": "success",
                "order": orders[idx]
            }), 200

    return jsonify({
        "status": "error",
        "error": f"Order with ID {order_id} not found"
    }), 404


@orders_bp.route("/<int:order_id>", methods=["DELETE"])
def delete_order(order_id):
    """Delete an order by ID."""
    orders = load_json(_orders_path())
    new_orders = [o for o in orders if o.get("id") != order_id]

    if len(new_orders) == len(orders):
        return jsonify({
            "status": "error",
            "error": f"Order with ID {order_id} not found"
        }), 404

    save_json(_orders_path(), new_orders)
    return jsonify({
        "status": "success",
        "message": f"Order {order_id} deleted"

    }), 200

@orders_bp.route("/process_payment", methods=["POST"])
def process_payment():
    """Simulate payment processing and create an order."""
    data = request.get_json() or {}
    required = ["customer_name", "items", "subtotal"]

    # Validate
    missing = [f for f in required if data.get(f) is None]
    if missing:
        return jsonify({"status": "error", "error": f"Missing fields: {', '.join(missing)}"}), 400

    # Compute totals same as create_order
    try:
        subtotal = float(data.get("subtotal"))
    except (TypeError, ValueError):
        return jsonify({"status": "error", "error": "Invalid subtotal value"}), 400

    #Simulate payment success
    tax_rate = 0.07
    tax = round(subtotal * tax_rate, 2)
    total = round(subtotal + tax, 2)

    # Create new order Entry
    orders = load_json(_orders_path())
    new_id = max([o.get("id", 0) for o in orders], default=0) + 1

    order = {
        "id": new_id,
        "orderNumber": data.get("orderNumber") or _generate_order_number(),
        "customer_name": data.get("customer_name"),
        "email": data.get("email"),
        "address": data.get("address"),
        "payment": "mock" if data.get("payment") else None,
        "items": data.get("items"),
        "subtotal": round(subtotal, 2),
        "tax": tax,
        "total": total,
        "status": "paid",
        "date": data.get("created_at") or datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S"),
        "store": data.get("store") or None,
    }

    orders.append(order)
    save_json(_orders_path(), orders)

    return jsonify({
        "status": "success",
        "message": "Payment processed successfully.",
        "order": order
    }), 201
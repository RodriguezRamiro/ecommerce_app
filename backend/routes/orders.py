# backend/routes/orders.py

from flask import Blueprint, jsonify, request
from data.utils.file_manager import load_json, save_json
import uuid

orders_bp = Blueprint("orders", __name__)

# Allowed fields to be updated
ALLOWED_FIELDS ={"customer_name", "items", "total", "status"}

MAX_LIMIT = 100 # Avoid huge responses

@orders_bp.route("/", methods=["POST"])
def create_order():
    """Handle order creation."""
    data = request.get_json() or {}

    # Validate required fields
    required = ["customer_name", "items", "total"]
    missing = [field for field in required if not data.get(field)]
    if missing:
        return jsonify({
            "status": "error",
            "error": f"Missing fields: {', '.join(missing)}"
        }), 400

    # Assign a unique ID
    data["id"] = str(uuid.uuid4())
    data.setdefault("status", "pending")

    # Load existing orders
    orders = load_json("orders.json")

    # Add the new order
    orders.append(data)

    # Save updated list
    save_json("orders.json", orders)

    # Respond
    return jsonify({"status": "success", "order": data}), 201


@orders_bp.route("/", methods=["GET"])
def get_orders():
    """
    Retrieve all orders.
    GET /api/orders?page=1&limit=10
    Returns paginated list of orders plus meta onbject and X-Total-Count header.
    Optional: filter by ?status=pending (simple excat-match filter).
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
    orders = load_json("orders.json")
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
    response.headers["X-Total_Count"] = sstr(total)
    return response, 200


@orders_bp.route("/<order_id>", methods=["GET"])
def get_order_by_id(order_id):
    """Retrieve a single order by ID."""
    orders = load_json("orders.json")

    # Look for the order with matching ID
    order = next((o for o in orders if o.get("id") == order_id), None)
    if not order:
        return jsonify({
            "status": "error",
            "error": f"Order with ID {order_id} not found"
        }), 404

    return jsonify(order), 200


@orders_bp.route("/<order_id>", methods=["PUT"])
def update_order(order_id):
    """Update an existing order."""
    updated_data = request.get_json() or {}
    invalid_fields = [f for f in updated_data.keys() if f not in ALLOWED_FIELDS]

    if invalid_fields:
        return jsonify({
            "status": "error",
            "error": f"Invalid fields in update:{', '.join(invalid_fields)}"
        }), 400


    orders= load_json("orders.json")

    for idx, order in enumerate(orders):
        if order.get("id") == order_id:
            #Only update allowed fields
            for key, value in updated_data.items():
                if key in ALLOWED_FIELDS:
                    orders[idx][key] = value

            save_json("orders.json", orders)
            return jsonify({
                "status": "sucess",
                "order": orders[idx]
            }), 200

        return jsonify({
            "status": "error",
            "error": f"Order with ID {order_id} not found"
        }), 404


@orders_bp.route("/<order_id>", methods=["DELETE"])
def delete_order(order_id):
    """Delete an order by ID."""
    orders = load_json("orders.json")
    new_orders = [o for o in orders if o.get("id") != order_id]

    if len(new_orders) == len(orders):
        return jsonify({
            "status": "error",
            "error": f"Order with ID {order_id} not found"
        }), 400

    save_json("orders.json", new_orders)
    return jsonify({
        "status": "success",
        "message": f"Order {order_id} deleted"

    }), 200
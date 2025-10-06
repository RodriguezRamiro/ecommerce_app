# //backend/utils/validators.py

def validate_contact_form(data):
    errors = []

    if not data.get("name"):
        errors.append("Name is required.")
    if not data.get("email"):
        errors.append("Email is required.")
    if not data.get("message"):
        errors.append("Message is required.")

    return errors

# //backend/utils/validators.py


from typing import Dict, List
import re

try:
    from email_validator import validate_email, EmailNotValidError
    _EMAIL_VALIDATOR_AVAILABLE = True
except Exception:
    _EMAIL_VALIDATOR_AVAILABLE = False

_SIMPLE_EMAIL_RE = re.compile(r"[^@]+@[^@]+\.[^@]+")

def _is_valid_email(email: str) -> bool:
    email = (email or "").strip()
    if not email:
        return False
    if _EMAIL_VALIDATOR_AVAILABLE:
        try:
            validate_email(email)
            return True
        except Exception:
            return False
    return bool(_SIMPLE_EMAIL_RE.fullmatch(email))


def validate_contact_form(data: dict) -> Dict[str, List[str]]:
    """
    Validate contact form payload.

    Returns:
        errors: dict mapping field -> list of error messages. Empty dict means valid.
    """
    errors = {}

    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    message = (data.get("message") or "").strip()

    # Name checks
    if not name:
        errors.setdefault("name", []).append("Name is required.")
    elif len(name) < 2:
        errors.setdefault("name", []).append("Name must be at least 2 characters.")

    # Email checks
    if not email:
        errors.setdefault("email", []).append("Email is required.")
    elif not _is_valid_email(email):
        errors.setdefault("email", []).append("Email address is invalid.")

    # Message checks
    if not message:
        errors.setdefault("message", []).append("Message is required.")
    elif len(message) < 10:
        errors.setdefault("message", []).append("Message must be at least 10 characters.")

    return errors
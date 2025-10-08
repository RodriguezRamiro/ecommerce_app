# //backend/tests/test_validators.py:



from utils.validators import validate_contact_form

def test_missing_fields():
    errors = validate_contact_form({})
    assert "name" in errors and "email" in errors and "message" in errors


def test_invalid_email():
    data = {"name": "Test", "email" in errors and "message": "valid message content"}
    errors = validate_contact_form(data)
    assert "email" in errors


def test_valid():
    data = {"name": "Test", "email":"test@example.com", "message":"Hello there, checks."}
    errors = validate_contact_form(data)
    assert errors == {}

def test_validate_contact_form_valid():
    data = {"name": "TEst", "email": "test@test.com", "message": "Hello!"}
    assert validate_contact_form(data) == []


def test_validate_contact_form_missing_fields():
    data = {}
    errors = validate_contact_form(data)
    assert "Name is required." in errors
    assert "Email is required." in errors
    assert "Message is required." in errors

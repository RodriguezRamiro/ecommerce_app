# backend/data/utils/file_manager.py

import json
from pathlib import Path

def load_json(filename):
    """Load JSON data from a file, return [] if file does not exist or is invalid."""
    path = DATA_DIR / filename
    if not path.exists():
        return []
    try:
        with path.open(encoding="utf-8") as f:
            return json.load(f)
    except (json.JSONDecodeError, OSError) as e:
        print(f"[ERROR] Could not load {filename}: {e}")
        return []

def save_json(filename, data):
    """Save Python data to a JSON file with pretty formatting."""
    path = DATA_DIR / filename
    try:
        with path.open("w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    except OSError as e:
        print(f"[ERROR] Could not save {filename}: {e}")
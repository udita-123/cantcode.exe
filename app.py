#!/usr/bin/env python3
# app.py
from flask import Flask, request, jsonify
import os
import sqlite3
from predict import build_model, load_classes, predict_image

# Initialize Flask app
app = Flask(__name__)

# --- Load model & classes ---
classes = load_classes("classes.json")
model = build_model(num_classes=len(classes), ckpt_path="food_classifier.pth")

# --- Setup SQLite database ---
DB_PATH = "food_data.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
    CREATE TABLE IF NOT EXISTS food_predictions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT,
        label TEXT,
        confidence REAL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')
    conn.commit()
    conn.close()

init_db()

def save_prediction(filename, label, confidence):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        INSERT INTO food_predictions (filename, label, confidence)
        VALUES (?, ?, ?)
    ''', (filename, label, confidence))
    conn.commit()
    conn.close()

# --- Flask route ---
@app.route("/predict", methods=["POST"])
def predict_food():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    temp_path = f"temp_{file.filename}"
    file.save(temp_path)

    # Run prediction
    results = predict_image(temp_path, model, classes, topk=3)

    # Save predictions to DB
    for label, conf in results:
        save_prediction(file.filename, label, conf)

    # Remove temp file
    os.remove(temp_path)

    # Return results as JSON
    return jsonify([{"label": label, "confidence": conf} for label, conf in results])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)


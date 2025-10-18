from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import json
import os
import mysql.connector
from datetime import date
import re  

app = Flask(__name__)
from flask_cors import CORS
CORS(app)

#Food classes
# Class labels for food classification
class_labels = [
    "beignets", "breakfast_burrito", "caesar_salad", "chicken_curry",
    "fried_rice", "lasagna", "omelette", "pizza", "seaweed_salad",
    "shrimp_and_grits", "spaghetti_carbonara", "spring_rolls", "steak"
]

with open("data/calories.json", "r") as f:
    calorie_data = json.load(f)




# Load the pre-trained model
model = tf.keras.models.load_model("models/food_classifier.h5")

# Set up MySQL connection
db_connection = mysql.connector.connect(
    host="localhost",
    user="root",  
    password="Kavindu@8581",  
    database="food_calories_db"  
)
cursor = db_connection.cursor()

# Predict food category
def predict_food(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    predicted_class = class_labels[np.argmax(predictions)]
    confidence = np.max(predictions)

    return predicted_class, confidence

# Store data in the database
def store_data(food, weight, calories, confidence):
    query = """
        INSERT INTO food_predictions (food, weight, calories, confidence)
        VALUES (%s, %s, %s, %s)
    """
    cursor.execute(query, (food, weight, calories, confidence))
    db_connection.commit()

# Get all predictions from the database
def get_all_predictions():
    query = "SELECT * FROM food_predictions"
    cursor.execute(query)
    results = cursor.fetchall()
    return results

# Update a prediction in the database
def update_prediction(prediction_id, food, weight, calories, confidence):
    query = """
        UPDATE food_predictions
        SET food = %s, weight = %s, calories = %s, confidence = %s
        WHERE id = %s
    """
    cursor.execute(query, (food, weight, calories, confidence, prediction_id))
    db_connection.commit()

# Delete a prediction from the database
def delete_prediction(prediction_id):
    query = "DELETE FROM food_predictions WHERE id = %s"
    cursor.execute(query, (prediction_id,))
    db_connection.commit()

# API to predict food and store data
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    img_path = os.path.join("uploads", file.filename)
    os.makedirs("uploads", exist_ok=True)
    file.save(img_path)

    # test food data
    if re.match(r"^t\d+\.jpg$", file.filename.lower()):
        return jsonify({"error": "Invalid image for prediction"}), 300

    weight = request.form.get("weight", type=float)
    if weight is None or weight <= 0:
        return jsonify({"error": "Invalid or missing weight"}), 400

    # Predict the food
    predicted_food, confidence = predict_food(img_path)

    # Get calorie data
    calories_per_serving = calorie_data.get(predicted_food, "Unknown")
    if calories_per_serving != "Unknown":
        total_calories = calories_per_serving * weight / 100  # Calculation Adjust calories based on weight
    else:
        total_calories = "Unknown"

    # Store in the database
    store_data(predicted_food, weight, total_calories, f"{confidence * 100:.2f}%")

    return jsonify({
        "food": predicted_food,
        "confidence": f"{confidence * 100:.2f}%",
        "calories_per_100g": calories_per_serving,
        "total_calories": total_calories
    })

# API to get all predictions
@app.route("/predictions", methods=["GET"])
def get_predictions():
    predictions = get_all_predictions()
    predictions_list = []
    for prediction in predictions:
        predictions_list.append({
            "id": prediction[0],
            "food": prediction[1],
            "weight": prediction[2],
            "calories": prediction[3],
            "confidence": prediction[4]
        })
    return jsonify(predictions_list)

# API to update a prediction
@app.route("/predictions/<int:prediction_id>", methods=["PUT"])
def update_prediction_route(prediction_id):
    data = request.get_json()
    food = data.get("food")
    weight = data.get("weight")
    calories = data.get("calories")
    confidence = data.get("confidence")

    if not all([food, weight, calories, confidence]):
        return jsonify({"error": "Missing required fields"}), 400

    update_prediction(prediction_id, food, weight, calories, confidence)
    return jsonify({"message": "Prediction updated successfully"})

# API to delete a prediction
@app.route("/predictions/<int:prediction_id>", methods=["DELETE"])
def delete_prediction_route(prediction_id):
    delete_prediction(prediction_id)
    return jsonify({"message": "Prediction deleted successfully"})

# daily calorie calculator
def calculate_bmi(weight_kg, height_cm):
    height_m = height_cm / 100
    return round(weight_kg / (height_m ** 2), 2)

def calculate_daily_calories(weight, height, age, gender):
    if gender == 'male':
        bmr = 10 * weight + 6.25 * height - 5 * age + 5   #men
    else:
        bmr = 10 * weight + 6.25 * height - 5 * age - 161  #women
    return round(bmr * 1.2, 2)  # Estimate Basal Metabolic Rate (BMR) Calories=BMR×Activity Factor

@app.route('/user', methods=['POST'])
def update_user():
    data = request.json
    height = data['height_cm']
    weight = data['weight_kg']
    age = data['age']
    gender = data['gender']
    bmi = calculate_bmi(weight, height)
    daily_cal = calculate_daily_calories(weight, height, age, gender)

    cursor.execute("""
        INSERT INTO user_profile (height_cm, weight_kg, age, gender, bmi, daily_calories_needed)
        VALUES (%s, %s, %s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE 
        height_cm=%s, weight_kg=%s, age=%s, gender=%s, bmi=%s, daily_calories_needed=%s
    """, (height, weight, age, gender, bmi, daily_cal,
          height, weight, age, gender, bmi, daily_cal))
    db_connection.commit()

    return jsonify({'bmi': bmi, 'daily_calories_needed': daily_cal})

@app.route('/summary', methods=['GET'])
def get_summary():
    today = date.today().strftime('%Y-%m-%d')

    # Get the most recent user (latest inserted)
    cursor.execute("SELECT id, daily_calories_needed FROM user_profile ORDER BY id DESC LIMIT 1")
    user = cursor.fetchone()

    if user:
        user_id = user[0]
        daily_calories_needed = user[1]
    else:
        return jsonify({'daily_calories_needed': 0, 'total_consumed': 0})

    # Get total consumed calories for that user
    cursor.execute("""
        SELECT SUM(calories) 
        FROM food_predictions 
        WHERE DATE(timestamp) = %s
    """, (today,))
    result = cursor.fetchone()
    total_consumed = result[0] if result[0] is not None else 0

    return jsonify({
        'daily_calories_needed': daily_calories_needed,
        'total_consumed': total_consumed
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3606, debug=True)

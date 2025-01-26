import pickle
import requests
from flask import Blueprint, jsonify, request, render_template
from datetime import datetime

routes = Blueprint('routes', __name__)

with open("flight_path_model.pkl", "rb") as f:
    flight_model = pickle.load(f)

@routes.route("/")
def index():
    return render_template("index.html")

# Function to fetch live flights from OpenSky Network API
def get_live_flights():
    url = "https://opensky-network.org/api/states/all"
    response = requests.get(url)
    
    if response.status_code != 200:
        return []
    
    flights = response.json().get("states", [])
    
    flight_data = []
    for flight in flights:
        flight_data.append({
            "flight_number": flight[1],  # Call sign (Flight number)
            "latitude": flight[6],       # Latitude
            "longitude": flight[5],      # Longitude
            "altitude": flight[7],       # Altitude
        })
    
    return flight_data

# Route to get live flight data
@routes.route("/get_flights", methods=["GET"])
def get_flights():
    flight_data = get_live_flights()  # Fetch data from OpenSky Network
    return jsonify(flight_data)

# Flight path prediction route (keep this as is)
@routes.route("/predict_flight_path", methods=["POST"])
def predict_flight_path():
    data = request.json
    input_features = [
        data['latitude'],
        data['longitude'],
        data['altitude'],
        data['time_delta']
    ]
    prediction = flight_model.predict([input_features])[0]

    return jsonify({
        "predicted_latitude": prediction[0],
        "predicted_longitude": prediction[1],
        "predicted_altitude": prediction[2]
    })

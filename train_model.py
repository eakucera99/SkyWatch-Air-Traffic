import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import pickle

# Load historical flight data
data = pd.read_csv("data/historical_flight_data.csv")

# Prepare features and target
data['time_delta'] = (pd.to_datetime(data['timestamp']) - pd.to_datetime(data['timestamp']).min()).dt.total_seconds()
X = data[['latitude', 'longitude', 'altitude', 'time_delta']]
y = data[['latitude', 'longitude', 'altitude']]

# Train/Test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestRegressor()
model.fit(X_train, y_train)

# Save the trained model
with open("flight_path_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("Model trained and saved successfully.")

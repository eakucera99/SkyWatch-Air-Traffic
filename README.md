SkyWatch: Real-Time Air Traffic Map
A real-time air traffic monitoring application that displays aircraft on a map, predicts their future positions, and visualizes their flight paths. The application allows users to input flight parameters and view aircraft data on a live map.

Features
Real-time aircraft data visualization on a map.
Aircraft position prediction over a defined time interval.
Interactive map using Leaflet.js for plotting aircraft locations.
Form to filter aircraft data based on latitude, longitude, and prediction time.
User-friendly interface to submit and view results.
Technologies Used
Flask: Python web framework for building the backend API and handling routes.
Leaflet.js: JavaScript library for interactive maps.
HTML/CSS: Front-end structure and styling.
JavaScript (AJAX): To send form data to the backend without reloading the page.
OpenStreetMap: Map tiles for the base map.
Project Structure
bash
Copy
Edit
/real-time-air-traffic-map
│
├── /static
│   ├── /css
│   │   └── styles.css       
│   └── /js
│       └── scripts.js       
│
├── /templates
│   └── index.html           
│
├── /app
│   ├── __init__.py          
│   ├── routes.py            
│   └── models.py            
│
├── main.py                  
├── requirements.txt         
└── README.md                
Installation
Clone the repository:

bash
Copy
Edit
git clone https://github.com/eakucera99/SkyWatch.git
cd SkyWatch
Create a virtual environment:

bash
Copy
Edit
python3 -m venv venv
source venv/bin/activate 
Install the dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Run the Flask app:

bash
Copy
Edit
python main.py
The app will be available at http://127.0.0.1:5000/.

Usage
Open the app in your browser: Go to http://127.0.0.1:5000/ (or the URL specified in your terminal).
Submit the air traffic control form: Fill in the form with the minimum and maximum latitude/longitude values, as well as the prediction time (in minutes).
View the map: The aircraft will be plotted on the map, and you can click on the markers to view more details (such as speed, heading, and predicted position).
Aircraft Prediction: The app will calculate the predicted position based on the user input and draw a path for the aircraft.
Features in Development
Real-time Data: Currently, the aircraft data is simulated. Integration with a real-world API (e.g., ADS-B data) is planned for future versions.
Authentication: User login and saving favorite aircraft data for future reference (optional).
Roadmap
 Integrate live air traffic data API for real-time aircraft information.
 Implement user authentication for saving preferences and search history.
 Add more advanced flight path predictions and visualization.
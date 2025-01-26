**SkyWatch: Real-Time Air Traffic Map**

A real-time air traffic monitoring application that displays aircraft on a map, predicts their future positions, and visualizes their flight paths. The application allows users to input flight parameters and view aircraft data on a live map.

Features
Real-time aircraft data visualization on a map.
Aircraft position prediction over a defined time interval.
Interactive map using Leaflet.js for plotting aircraft locations.
Form to filter aircraft data based on latitude, longitude, and prediction time.
User-friendly interface to submit and view results.

Technologies Used:

Flask: Python web framework for building the backend API and handling routes.\
Cesiumjs: JavaScript library for interactive maps.\
HTML/CSS: Front-end structure and styling.\
JavaScript (AJAX): To send form data to the backend without reloading the page.

Installation:

bash\
Copy\
Edit\
git clone https://github.com/eakucera99/SkyWatch-Air-Traffic.git \
cd SkyWatch-Air-Traffic

Create a virtual environment:

bash\
Copy\
Edit\
python3 -m venv venv\
source venv/bin/activate\

Install the dependencies:

bash\
Copy\
Edit\
pip install -r requirements.txt\

Run the Flask app:

bash\
Copy\
Edit\
python main.py\
The app will be available at http://127.0.0.1:5000/.



Roadmap
 Make imagery clear\
 Clean up the flight and add in more flight info\
 Implement user authentication for saving preferences and search history.\
 Add more advanced flight path predictions.

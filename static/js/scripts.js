if (typeof Cesium !== 'undefined') {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmMzk2ZDUxYy04Zjk1LTRmY2YtYjUzMC1jZDQyMDEwOTk3ZTIiLCJpZCI6MjcxNDcxLCJpYXQiOjE3Mzc4NDg5NzJ9.ibMmpuvCXS_4AzrKKu-eruLbtn-CooYzoUTv7xpNQa0';

// Initialize Cesium Viewer
const viewer = new Cesium.Viewer("cesiumContainer", {
    terrainProvider: Cesium.createWorldTerrain(), // Use Cesium World Terrain
    imageryProvider: Cesium.createWorldImagery({  // Use global imagery
        style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS, // Aerial with labels
    }),
    baseLayerPicker: false, // Disable base layer picker for a cleaner UI
    timeline: false,        // Hide the timeline bar
    animation: false,       // Hide the animation controls
    geocoder: false,        // Hide the search bar
});

// Enable lighting for better terrain visualization
viewer.scene.globe.enableLighting = true;

// Optimize the map for high-DPI displays
viewer.resolutionScale = window.devicePixelRatio;

// Set the initial camera view to focus on a specific area (adjust as needed)
viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(-95.7129, 37.0902, 5000000), // USA view
});

    // Define restricted airspace zones
    const restrictedAirspace = [
        { lat: 40.7128, lon: -74.0060, radius: 50 }, // NYC example
        { lat: 34.0522, lon: -118.2437, radius: 100 } // LA example
    ];

    // Function to check if a flight is in restricted airspace
    function isInRestrictedZone(flight) {
        return restrictedAirspace.some(zone => {
            const zoneCenter = Cesium.Cartesian3.fromDegrees(zone.lon, zone.lat);
            const flightPosition = Cesium.Cartesian3.fromDegrees(flight.longitude, flight.latitude);
            const distance = Cesium.Cartesian3.distance(zoneCenter, flightPosition);
            return distance <= zone.radius * 1000; // Convert km to meters
        });
    }

    // Function to fetch and display flights
    async function fetchFlights() {
        try {
            const response = await fetch("/get_flights");
            const flights = await response.json();

            // Clear existing entities before adding new ones
            viewer.entities.removeAll();

            flights.forEach(flight => {
                const restricted = isInRestrictedZone(flight);

                viewer.entities.add({
                    position: Cesium.Cartesian3.fromDegrees(flight.longitude, flight.latitude, flight.altitude),
                    point: {
                        pixelSize: 8,
                        color: restricted ? Cesium.Color.RED : Cesium.Color.GREEN
                    },
                    label: {
                        text: `Flight: ${flight.flight_number}`,
                        scale: 0.5
                    }
                });
            });
        } catch (error) {
            console.error("Error fetching flights:", error);
        }
    }

    // Function to add a flight path to the map
    function addFlightPath(flightData) {
        const positions = flightData.map(point =>
            Cesium.Cartesian3.fromDegrees(point.longitude, point.latitude, point.altitude)
        );

        viewer.entities.add({
            polyline: {
                positions: positions,
                width: 5,
                material: Cesium.Color.RED
            }
        });
    }

    // Add restricted airspace zones to the map
    restrictedAirspace.forEach(zone => {
        const rectangle = Cesium.Rectangle.fromDegrees(
            zone.lon - 0.5, zone.lat - 0.5,
            zone.lon + 0.5, zone.lat + 0.5
        );

        viewer.entities.add({
            name: "Restricted Airspace",
            rectangle: {
                coordinates: rectangle,
                material: Cesium.Color.RED.withAlpha(0.3),
                outline: true,
                outlineColor: Cesium.Color.RED
            }
        });
    });

    // Update flights every minute and fetch initially
    setInterval(fetchFlights, 60000);
    fetchFlights();
} else {
    console.error("Cesium library is not loaded. Please check your script tag.");
}

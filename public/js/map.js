// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com

// mapboxgl.accessToken = mapToken;
// const map = new mapboxgl.Map({
//   container: "map", // container ID
//   style: "mapbox://styles/mapbox/streets-v12",
//   center: [77.2088, 8.6139], // starting position [lng, lat]. Note that lat must be set between -90 and 90
//   zoom: 9, // starting zoom
// });

//

// Initialize map centered at Pune
// var map = L.map('map').setView([28.6139, 77.2088], 13);

// // Add OpenStreetMap tiles
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   maxZoom: 19,
//   attribution: '© OpenStreetMap contributors'
// }).addTo(map);

// // Add a marker
// var marker = L.marker([28.6139, 77.2088]).addTo(map);
// marker.bindPopup("New Delhi").openPopup();



// -------------------------------------------------------------------------------------------------------------------


// Initialize map with default center (India)
var map = L.map("map").setView([20.5937, 78.9629], 5);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  // attribution: "© OpenStreetMap contributors",
}).addTo(map);

// Build full address
const fullAddress = `${listingLocation}, ${listingCountry}`;

// Create a red icon
const customMarker = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [20, 30], // size of the icon
  iconAnchor: [10, 30], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -34], // point from which the popup opens relative to the icon
  shadowSize: [30, 30], // size of the shadow
});


// Use Nominatim API for geocoding
fetch(
  `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    fullAddress
  )}`
)
  .then((res) => res.json())
  .then((data) => {
    if (data.length > 0) {
      const lat = data[0].lat;
      const lon = data[0].lon;

      // Move map to listing
      map.setView([lat, lon], 14);

      // Add marker
      L.marker([lat, lon], { icon: customMarker  })
        .addTo(map)
        .bindPopup(
          `<b>${fullAddress}</b><br> <p>Exact location provided after Booking</p>`
        )
        .openPopup();

      // Add circular polygon (circle) around location
      L.circle([lat, lon], {
        color: "red", // Border color
        fillColor: "red", // Fill color
        fillOpacity: 0.2, // Transparency
        radius: 500, // Radius in meters
      }).addTo(map);
    } else {
      console.error("Location not found for:", fullAddress);
    }
  })
  .catch((err) => console.error("Geocoding error:", err));

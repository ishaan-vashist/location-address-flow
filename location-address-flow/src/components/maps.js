import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import AddressForm from "./AddressForm";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";

// Fixing the default marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Map = () => {
  const [position, setPosition] = useState([37.7749, -122.4194]); // Default location: San Francisco

  // Custom component to recenter the map on the new position
  const RecenterMap = ({ position }) => {
    const map = useMap();
    map.setView(position, 13); // Move map view to the new position with zoom level 13
    return null;
  };

  // Locate Me functionality
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const newPosition = [location.coords.latitude, location.coords.longitude];
          setPosition(newPosition); // Update the position state
        },
        () => {
          alert("Unable to fetch your location. Please try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Save address functionality
  const handleSaveAddress = async (addressData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/address/save", addressData);
      alert(response.data.message); // Show success message from the backend
    } catch (error) {
      alert("Failed to save address: " + (error.response?.data?.message || error.message));
    }
  };

  // Component to handle map click and update the marker position
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>
          Selected Location: <br />
          Latitude: {position[0]}, Longitude: {position[1]}
        </Popup>
      </Marker>
    );
  };

  return (
    <div>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "50vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <RecenterMap position={position} /> {/* Automatically move the map */}
        <LocationMarker />
      </MapContainer>
      <button
        onClick={handleLocateMe}
        style={{
          marginTop: "10px",
          padding: "8px 12px",
          cursor: "pointer",
          borderRadius: "5px",
          border: "1px solid #ddd",
        }}
      >
        Locate Me
      </button>
      <AddressForm position={position} onSave={handleSaveAddress} />
    </div>
  );
};

export default Map;

import React from "react";
import Map from "../components/maps";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Location Selector</h1>
        <p>Select a location by clicking on the map below or use the "Locate Me" button to find your current location.</p>
      </div>
      <div className="map-container">
        <Map />
      </div>
    </div>
  );
};

export default Home;

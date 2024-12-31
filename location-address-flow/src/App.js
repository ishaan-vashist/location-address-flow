import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar"; // Assuming Navbar.js is in the components folder
import Map from "./components/maps"; // Corrected import path for Map.js
import Home from "./pages/Home"; // Assuming Home.js is in the pages folder
import AddressList from "./pages/AddressList"; // Assuming AddressList.js is in the pages folder

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> {/* Navbar for navigation */}
        <header className="App-header">
          <h1>Location Address Flow</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} /> {/* Homepage */}
            <Route path="/map" element={<Map />} /> {/* Map page */}
            <Route path="/addresses" element={<AddressList />} /> {/* Saved addresses page */}
          </Routes>
        </main>
        <footer className="footer">
          <p>
            &copy; {new Date().getFullYear()} Location Address Flow. All rights reserved. Built with ❤️ by <a href="https://www.linkedin.com/in/ishaan-vashist-94b2b0167/">Ishaan Vashist</a>.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

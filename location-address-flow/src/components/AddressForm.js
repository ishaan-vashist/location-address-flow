import React, { useState } from "react";

const AddressForm = ({ position, onSave }) => {
  const [houseNumber, setHouseNumber] = useState("");
  const [roadArea, setRoadArea] = useState("");
  const [category, setCategory] = useState("Home");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!houseNumber || !roadArea) {
      alert("Please fill in all fields!");
      return;
    }
    const addressData = {
      houseNumber,
      roadArea,
      category,
      latitude: position[0],
      longitude: position[1],
    };
    onSave(addressData);
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="House/Flat No."
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
        <input
          type="text"
          placeholder="Road/Area"
          value={roadArea}
          onChange={(e) => setRoadArea(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
        >
          <option value="Home">Home</option>
          <option value="Office">Office</option>
          <option value="Friends & Family">Friends & Family</option>
        </select>
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddressForm;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddressList.css";

const AddressList = () => {
  const [addresses, setAddresses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAddresses, setFilteredAddresses] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [newAddress, setNewAddress] = useState({ houseNumber: "", roadArea: "", category: "Home" });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/address/all");
        setAddresses(response.data);
        setFilteredAddresses(response.data);
      } catch (error) {
        alert("Failed to fetch addresses. Please try again later.");
      }
    };

    fetchAddresses();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredAddresses(
      addresses.filter(
        (address) =>
          address.category.toLowerCase().includes(query) ||
          address.houseNumber.toLowerCase().includes(query) ||
          address.roadArea.toLowerCase().includes(query)
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/address/${id}`);
      const updatedAddresses = addresses.filter((address) => address._id !== id);
      setAddresses(updatedAddresses);
      setFilteredAddresses(updatedAddresses);
      alert("Address deleted successfully!");
    } catch (error) {
      alert("Failed to delete address. Please try again.");
    }
  };

  const handleEdit = (id) => {
    const addressToEdit = addresses.find((address) => address._id === id);
    setEditMode(id);
    setNewAddress(addressToEdit || { houseNumber: "", roadArea: "", category: "Home" });
  };

  const handleSaveEdit = async (id) => {
    if (!newAddress.houseNumber || !newAddress.roadArea) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/address/${id}`, newAddress);
      const updatedAddresses = addresses.map((address) =>
        address._id === id ? { ...address, ...newAddress } : address
      );
      setAddresses(updatedAddresses);
      setFilteredAddresses(updatedAddresses);
      setEditMode(null);
      alert("Address updated successfully!");
    } catch (error) {
      alert("Failed to update address. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  return (
    <div className="address-list-container">
      <h1>Saved Addresses</h1>
      <input
        type="text"
        placeholder="Search addresses..."
        value={searchQuery}
        onChange={handleSearch}
        className="address-list-search"
      />
      <ul className="address-list">
        {filteredAddresses.map((address) => (
          <li className="address-list-item" key={address._id}>
            {editMode === address._id ? (
              <div className="address-edit-form">
                <input
                  type="text"
                  name="houseNumber"
                  value={newAddress.houseNumber}
                  onChange={handleInputChange}
                  placeholder="House Number"
                  className="address-input"
                />
                <input
                  type="text"
                  name="roadArea"
                  value={newAddress.roadArea}
                  onChange={handleInputChange}
                  placeholder="Road/Area"
                  className="address-input"
                />
                <select
                  name="category"
                  value={newAddress.category}
                  onChange={handleInputChange}
                  className="address-select"
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Friends & Family">Friends & Family</option>
                </select>
                <div className="edit-buttons">
                  <button
                    className="address-button save-button"
                    onClick={() => handleSaveEdit(address._id)}
                  >
                    Save
                  </button>
                  <button
                    className="address-button cancel-button"
                    onClick={() => setEditMode(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="address-details">
                  <strong>{address.category}:</strong> {address.houseNumber}, {address.roadArea}
                </div>
                <div className="address-buttons">
                  <button
                    className="address-button edit-button"
                    onClick={() => handleEdit(address._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="address-button delete-button"
                    onClick={() => handleDelete(address._id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      {filteredAddresses.length === 0 && <p className="address-list-empty">No addresses found.</p>}
    </div>
  );
};

export default AddressList;

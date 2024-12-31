const express = require('express');
const Address = require('../models/Address');
const router = express.Router();

// Endpoint to save an address
router.post('/save', async (req, res) => {
  const { houseNumber, roadArea, category, latitude, longitude } = req.body;

  // Validate required fields
  if (!houseNumber || !roadArea || !latitude || !longitude) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    // Create a new address record
    const newAddress = new Address({ houseNumber, roadArea, category, latitude, longitude });
    await newAddress.save();
    console.log('New address saved:', newAddress); // Log saved address
    res.status(201).json({ message: 'Address saved successfully!', address: newAddress });
  } catch (err) {
    console.error('Error saving address:', err.message); // Log error details
    res.status(500).json({ message: 'Failed to save address', error: err.message });
  }
});

// Endpoint to fetch all addresses
router.get('/all', async (req, res) => {
  try {
    // Fetch all addresses from the database
    const addresses = await Address.find();
    console.log('Addresses fetched:', addresses); // Log fetched addresses
    res.status(200).json(addresses);
  } catch (err) {
    console.error('Error fetching addresses:', err.message); // Log error details
    res.status(500).json({ message: 'Failed to fetch addresses', error: err.message });
  }
});

// Update an address
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { houseNumber, roadArea, category } = req.body;
  
    if (!houseNumber || !roadArea || !category) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
  
    try {
      const updatedAddress = await Address.findByIdAndUpdate(
        id,
        { houseNumber, roadArea, category },
        { new: true } // Return the updated document
      );
  
      if (!updatedAddress) {
        return res.status(404).json({ message: 'Address not found!' });
      }
  
      res.status(200).json({ message: 'Address updated successfully!', address: updatedAddress });
    } catch (err) {
      console.error('Error updating address:', err.message);
      res.status(500).json({ message: 'Failed to update address', error: err.message });
    }
  });

  // Delete an address
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedAddress = await Address.findByIdAndDelete(id);
  
      if (!deletedAddress) {
        return res.status(404).json({ message: 'Address not found!' });
      }
  
      res.status(200).json({ message: 'Address deleted successfully!' });
    } catch (err) {
      console.error('Error deleting address:', err.message);
      res.status(500).json({ message: 'Failed to delete address', error: err.message });
    }
  });
  
  

module.exports = router;

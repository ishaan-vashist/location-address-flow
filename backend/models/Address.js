const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  houseNumber: { type: String, required: true },
  roadArea: { type: String, required: true },
  category: { type: String, enum: ['Home', 'Office', 'Friends & Family'], default: 'Home' },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

module.exports = mongoose.model('Address', AddressSchema);

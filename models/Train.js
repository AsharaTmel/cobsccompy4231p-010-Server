const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  train_id: { type: String, required: true, unique: true },
  train_name: { type: String, required: true },
  route_id: { type: String, required: true },
  direction: { type: String, enum: ['upward', 'downward'], required: true }, // New field
  stations: [String] // Assuming this is an array of station names
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;
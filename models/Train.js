const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  trainName: { type: String, required: true },
  route: { type: String, required: true },
  startTime: Date,
  estimatedEndTime: Date,
  currentLocation: String,
  nextStop: String,
  status: { type: String, default: 'Scheduled' }
});

module.exports = mongoose.model('Train', trainSchema);

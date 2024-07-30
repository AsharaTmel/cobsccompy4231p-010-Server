const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, default: 'Scheduled' },
  startTime: { type: Date, default: null },
  currentStop: { type: String, default: null },
  nextStop: { type: String, default: null },
  endTime: { type: Date, default: null },
  route: { type: String, required: true }  // Added route field
});

module.exports = mongoose.model('Train', trainSchema);

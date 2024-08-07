// models/Fulltrain.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fullTrainSchema = new Schema({
  fulltrain_id: { type: String, required: true },
  train_id: { type: String, required: true },
  engine_id: { type: String, required: true },
  // Add other relevant fields here
}, { collection: 'fulltrains' }); // Explicitly set the collection name

module.exports = mongoose.model('Fulltrain', fullTrainSchema);

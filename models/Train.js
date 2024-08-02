const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
  train_id: { type: String, required: true, unique: true },
  train_name: { type: String, required: true },
  route_id: { type: String, required: true },
  stations: [{ type: String }]
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;

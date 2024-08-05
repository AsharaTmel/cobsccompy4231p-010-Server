const mongoose = require('mongoose');

const FullTrainSchema = new mongoose.Schema({
  fulltrain_id: { type: String, required: true, unique: true },
  train_id: { type: String, required: true },
  engine_id: { type: String, required: true }
});

module.exports = mongoose.model('FullTrain', FullTrainSchema);
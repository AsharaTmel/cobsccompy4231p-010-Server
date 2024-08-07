const mongoose = require('mongoose');  // Add this line
const engineSchema = new mongoose.Schema({
  engine_id: { type: String, required: true, unique: true },
  engine_number: { type: String, required: true },
  other_details: {
    type: {
      type: String,
      enum: ['Diesel', 'Electric'],
      required: true
    },
    capacity: { type: String, required: true },
    year_of_manufacture: { type: Number, required: true }
  }
});

const Engine = mongoose.model('Engine', engineSchema);

module.exports = Engine;
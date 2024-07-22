const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stations: [String]
});

module.exports = mongoose.model('Route', routeSchema);

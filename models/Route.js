const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  route_id: { type: String, required: true, unique: true },
  route_name: { type: String, required: true },
  details: {
    start_station: { type: String, required: true },
    end_station: { type: String, required: true },
    total_distance_km: { type: Number, required: true },
    total_duration_minutes: { type: Number, required: true }
  }
});

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;

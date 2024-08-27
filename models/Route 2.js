const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Route:
 *       type: object
 *       properties:
 *         route_id:
 *           type: string
 *           description: Unique identifier for the route
 *         route_name:
 *           type: string
 *           description: Name of the route
 *         details:
 *           type: object
 *           properties:
 *             start_station:
 *               type: string
 *               description: Name of the starting station
 *             end_station:
 *               type: string
 *               description: Name of the ending station
 *             total_distance_km:
 *               type: number
 *               format: float
 *               description: Total distance of the route in kilometers
 *             total_duration_minutes:
 *               type: number
 *               format: float
 *               description: Total duration of the route in minutes
 *           required:
 *             - start_station
 *             - end_station
 *             - total_distance_km
 *             - total_duration_minutes
 *       required:
 *         - route_id
 *         - route_name
 *         - details
 */

const routeSchema = new mongoose.Schema({
  /**
   * Unique identifier for the route
   * @type {String}
   */
  route_id: { type: String, required: true, unique: true },

  /**
   * Name of the route
   * @type {String}
   */
  route_name: { type: String, required: true },

  /**
   * Details about the route
   * @type {Object}
   * @property {String} start_station - Name of the starting station
   * @property {String} end_station - Name of the ending station
   * @property {Number} total_distance_km - Total distance of the route in kilometers
   * @property {Number} total_duration_minutes - Total duration of the route in minutes
   */
  details: {
    start_station: { type: String, required: true },
    end_station: { type: String, required: true },
    total_distance_km: { type: Number, required: true },
    total_duration_minutes: { type: Number, required: true }
  }
});

/**
 * Route model based on the schema
 * @type {mongoose.Model}
 */
const Route = mongoose.model('Route', routeSchema);

module.exports = Route;

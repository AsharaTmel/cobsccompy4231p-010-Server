const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     HistoricalData:
 *       type: object
 *       properties:
 *         engine_id:
 *           type: string
 *           description: Identifier for the engine
 *         train_name:
 *           type: string
 *           description: Name of the train
 *         direction:
 *           type: string
 *           description: Direction of travel (e.g., north, south)
 *         start_time:
 *           type: string
 *           format: date-time
 *           description: Start time of the journey
 *         start_location:
 *           type: string
 *           description: Starting location of the train
 *         current_location:
 *           type: string
 *           description: Current location of the train
 *         estimated_end_time:
 *           type: string
 *           format: date-time
 *           description: Estimated end time of the journey
 *         locations:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               station:
 *                 type: string
 *                 description: Name of the station
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: Timestamp when the train was at the station
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the record was created
 *       required:
 *         - engine_id
 *         - train_name
 *         - direction
 *         - start_time
 *         - start_location
 *         - current_location
 *         - estimated_end_time
 *         - locations
 *         - createdAt
 */

const historicalDataSchema = new mongoose.Schema({
  /**
   * Identifier for the engine
   * @type {String}
   */
  engine_id: { type: String, required: true },

  /**
   * Name of the train
   * @type {String}
   */
  train_name: { type: String, required: true },

  /**
   * Direction of travel (e.g., north, south)
   * @type {String}
   */
  direction: { type: String, required: true },

  /**
   * Start time of the journey
   * @type {String}
   * @format date-time
   */
  start_time: { type: String, required: true },

  /**
   * Starting location of the train
   * @type {String}
   */
  start_location: { type: String, required: true },

  /**
   * Current location of the train
   * @type {String}
   */
  current_location: { type: String, required: true },

  /**
   * Estimated end time of the journey
   * @type {String}
   * @format date-time
   */
  estimated_end_time: { type: String, required: true },

  /**
   * List of locations with timestamps where the train has been
   * @type {Array<Object>}
   * @property {String} station - Name of the station
   * @property {String} timestamp - Timestamp when the train was at the station
   */
  locations: [{
    station: { type: String, required: true },
    timestamp: { type: String, required: true }
  }],

  /**
   * The date and time when the record was created
   * @type {Date}
   * @default Date.now
   */
  createdAt: {
    type: Date,
    default: Date.now // Automatically set the current date and time
  }
});

/**
 * HistoricalData model based on the schema
 * @type {mongoose.Model}
 */
module.exports = mongoose.model('HistoricalData', historicalDataSchema);

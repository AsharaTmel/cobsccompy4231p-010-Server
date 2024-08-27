const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Train:
 *       type: object
 *       properties:
 *         train_id:
 *           type: string
 *           description: Unique identifier for the train
 *         train_name:
 *           type: string
 *           description: Name of the train
 *         route_id:
 *           type: string
 *           description: Identifier for the route associated with the train
 *         direction:
 *           type: string
 *           enum: [upward, downward]
 *           description: Direction of travel of the train
 *         stations:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of station names that the train will stop at
 *       required:
 *         - train_id
 *         - train_name
 *         - route_id
 *         - direction
 *         - stations
 */

const trainSchema = new mongoose.Schema({
  /**
   * Unique identifier for the train
   * @type {String}
   */
  train_id: { type: String, required: true, unique: true },

  /**
   * Name of the train
   * @type {String}
   */
  train_name: { type: String, required: true },

  /**
   * Identifier for the route associated with the train
   * @type {String}
   */
  route_id: { type: String, required: true },

  /**
   * Direction of travel of the train
   * @type {String}
   * @enum {['upward', 'downward']}
   */
  direction: { type: String, enum: ['upward', 'downward'], required: true },

  /**
   * Array of station names that the train will stop at
   * @type {Array<String>}
   */
  stations: [String]
});

/**
 * Train model based on the schema
 * @type {mongoose.Model}
 */
const Train = mongoose.model('Train', trainSchema);

module.exports = Train;

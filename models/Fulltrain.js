const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * @swagger
 * components:
 *   schemas:
 *     FullTrain:
 *       type: object
 *       properties:
 *         fulltrain_id:
 *           type: string
 *           description: Unique identifier for the full train
 *         train_id:
 *           type: string
 *           description: Identifier for the train
 *         engine_id:
 *           type: string
 *           description: Identifier for the engine used in the train
 *       required:
 *         - fulltrain_id
 *         - train_id
 *         - engine_id
 */

const fullTrainSchema = new Schema({
  /**
   * Unique identifier for the full train
   * @type {String}
   */
  fulltrain_id: { type: String, required: true },

  /**
   * Identifier for the train
   * @type {String}
   */
  train_id: { type: String, required: true },

  /**
   * Identifier for the engine used in the train
   * @type {String}
   */
  engine_id: { type: String, required: true },

  // Add other relevant fields here
}, { collection: 'fulltrains' }); // Explicitly set the collection name

/**
 * FullTrain model based on the schema
 * @type {mongoose.Model}
 */
module.exports = mongoose.model('FullTrain', fullTrainSchema);

const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Engine:
 *       type: object
 *       properties:
 *         engine_id:
 *           type: string
 *           description: Unique identifier for the engine
 *         engine_number:
 *           type: string
 *           description: Engine number
 *         other_details:
 *           type: object
 *           properties:
 *             type:
 *               type: string
 *               enum: [Diesel, Electric]
 *               description: Type of the engine
 *             capacity:
 *               type: string
 *               description: Capacity of the engine
 *             year_of_manufacture:
 *               type: integer
 *               description: Year of manufacture of the engine
 *       required:
 *         - engine_id
 *         - engine_number
 *         - other_details
 */

const engineSchema = new mongoose.Schema({
  /**
   * Unique identifier for the engine
   * @type {String}
   */
  engine_id: { type: String, required: true, unique: true },

  /**
   * Engine number
   * @type {String}
   */
  engine_number: { type: String, required: true },

  /**
   * Details about the engine
   * @type {Object}
   * @property {String} type - Type of the engine, e.g., Diesel or Electric
   * @property {String} capacity - Capacity of the engine
   * @property {Number} year_of_manufacture - Year of manufacture of the engine
   */
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

/**
 * Engine model based on the schema
 * @type {mongoose.Model}
 */
const Engine = mongoose.model('Engine', engineSchema);

module.exports = Engine;

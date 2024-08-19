const express = require('express');
const router = express.Router();
const engineController = require('../controllers/engineController');

/**
 * @swagger
 * tags:
 *   name: Engines
 *   description: API endpoints for managing engines
 */

/**
 * @swagger
 * /engines:
 *   get:
 *     summary: Get all engines
 *     tags: [Engines]
 *     responses:
 *       200:
 *         description: List of all engines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Engine'
 */
router.get('/', engineController.getAllEngines);

/**
 * @swagger
 * /engines/{engine_id}:
 *   get:
 *     summary: Get a specific engine by ID
 *     tags: [Engines]
 *     parameters:
 *       - name: engine_id
 *         in: path
 *         required: true
 *         description: Unique identifier for the engine
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the specified engine
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Engine'
 *       404:
 *         description: Engine not found
 */
router.get('/:engine_id', engineController.getEngineById);

/**
 * @swagger
 * /engines:
 *   post:
 *     summary: Create a new engine
 *     tags: [Engines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Engine'
 *     responses:
 *       201:
 *         description: Engine created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Engine'
 */
router.post('/', engineController.createEngine);

/**
 * @swagger
 * /engines/{engine_id}:
 *   put:
 *     summary: Update an existing engine
 *     tags: [Engines]
 *     parameters:
 *       - name: engine_id
 *         in: path
 *         required: true
 *         description: Unique identifier for the engine
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Engine'
 *     responses:
 *       200:
 *         description: Engine updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Engine'
 *       404:
 *         description: Engine not found
 */
router.put('/:engine_id', engineController.updateEngine);

/**
 * @swagger
 * /engines/{engine_id}:
 *   delete:
 *     summary: Delete an engine
 *     tags: [Engines]
 *     parameters:
 *       - name: engine_id
 *         in: path
 *         required: true
 *         description: Unique identifier for the engine
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Engine deleted successfully
 *       404:
 *         description: Engine not found
 */
router.delete('/:engine_id', engineController.deleteEngine);

/**
 * @swagger
 * /engines/{engine_id}/realtime:
 *   get:
 *     summary: Get real-time data for an engine
 *     tags: [Engines]
 *     parameters:
 *       - name: engine_id
 *         in: path
 *         required: true
 *         description: Unique identifier for the engine
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Real-time data of the specified engine
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 engine_id:
 *                   type: string
 *                   description: Unique identifier for the engine
 *                 status:
 *                   type: string
 *                   description: Current operational status of the engine
 *                 location:
 *                   type: string
 *                   description: Current location of the engine
 *       404:
 *         description: Engine not found
 */
router.get('/:engine_id/realtime', engineController.getRealTimeData);

module.exports = router;

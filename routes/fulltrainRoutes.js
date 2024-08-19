const express = require('express');
const router = express.Router();
const fullTrainController = require('../controllers/fulltrainController');

/**
 * @swagger
 * tags:
 *   name: FullTrains
 *   description: API endpoints for managing FullTrains
 */

/**
 * @swagger
 * /fulltrains:
 *   post:
 *     summary: Create a new FullTrain
 *     tags: [FullTrains]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FullTrain'
 *     responses:
 *       201:
 *         description: FullTrain created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FullTrain'
 */
router.post('/', fullTrainController.createFullTrain);

/**
 * @swagger
 * /fulltrains/train/{train_id}/unassign:
 *   patch:
 *     summary: Unassign an engine from a train
 *     tags: [FullTrains]
 *     parameters:
 *       - name: train_id
 *         in: path
 *         required: true
 *         description: Unique identifier for the train
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Engine unassigned successfully
 *       404:
 *         description: Train not found
 */
router.patch('/train/:train_id/unassign', fullTrainController.unassignEngine);

/**
 * @swagger
 * /fulltrains/train/assign:
 *   post:
 *     summary: Assign an engine to a train
 *     tags: [FullTrains]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               train_id:
 *                 type: string
 *                 description: Unique identifier for the train
 *               engine_id:
 *                 type: string
 *                 description: Unique identifier for the engine
 *     responses:
 *       200:
 *         description: Engine assigned successfully
 *       400:
 *         description: Bad request, invalid data
 */
router.post('/train/assign', fullTrainController.assignEngine);

/**
 * @swagger
 * /fulltrains/{fulltrain_id}:
 *   put:
 *     summary: Update a FullTrain by ID
 *     tags: [FullTrains]
 *     parameters:
 *       - name: fulltrain_id
 *         in: path
 *         required: true
 *         description: Unique identifier for the FullTrain
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FullTrain'
 *     responses:
 *       200:
 *         description: FullTrain updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FullTrain'
 *       404:
 *         description: FullTrain not found
 */
router.put('/:fulltrain_id', fullTrainController.updateFullTrain);

/**
 * @swagger
 * /fulltrains:
 *   get:
 *     summary: Get all FullTrains
 *     tags: [FullTrains]
 *     responses:
 *       200:
 *         description: List of all FullTrains
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FullTrain'
 */
router.get('/', fullTrainController.getAllFullTrains);

/**
 * @swagger
 * /fulltrains/{fulltrain_id}:
 *   get:
 *     summary: Get a single FullTrain by ID
 *     tags: [FullTrains]
 *     parameters:
 *       - name: fulltrain_id
 *         in: path
 *         required: true
 *         description: Unique identifier for the FullTrain
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the specified FullTrain
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FullTrain'
 *       404:
 *         description: FullTrain not found
 */
router.get('/:fulltrain_id', fullTrainController.getFullTrainById);

/**
 * @swagger
 * /fulltrains/realtime:
 *   get:
 *     summary: Get Real-Time Data for All FullTrains
 *     tags: [FullTrains]
 *     responses:
 *       200:
 *         description: Real-time data for all FullTrains
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   fulltrain_id:
 *                     type: string
 *                   status:
 *                     type: string
 *                   location:
 *                     type: string
 */
router.get('/realtime', fullTrainController.getAllFullTrainsRealTimeData);

/**
 * @swagger
 * /fulltrains/train/{train_id}:
 *   get:
 *     summary: Get FullTrains by Train ID
 *     tags: [FullTrains]
 *     parameters:
 *       - name: train_id
 *         in: path
 *         required: true
 *         description: Unique identifier for the train
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of FullTrains for the specified Train ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FullTrain'
 *       404:
 *         description: Train not found
 */
router.get('/train/:train_id', fullTrainController.getFullTrainsByTrainId);

/**
 * @swagger
 * /fulltrains/train/{train_id}:
 *   put:
 *     summary: Update a FullTrain by Train ID
 *     tags: [FullTrains]
 *     parameters:
 *       - name: train_id
 *         in: path
 *         required: true
 *         description: Unique identifier for the train
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FullTrain'
 *     responses:
 *       200:
 *         description: FullTrain updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FullTrain'
 *       404:
 *         description: Train not found
 */
router.put('/train/:train_id', fullTrainController.updateFullTrainByTrainId);

module.exports = router;

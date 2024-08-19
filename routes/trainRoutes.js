const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');

/**
 * @swagger
 * tags:
 *   name: Trains
 *   description: API endpoints for managing trains
 */

/**
 * @swagger
 * /trains:
 *   post:
 *     summary: Create a new train
 *     tags: [Trains]
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
 *               train_name:
 *                 type: string
 *                 description: Name of the train
 *               route_id:
 *                 type: string
 *                 description: Route ID associated with the train
 *               direction:
 *                 type: string
 *                 enum: [upward, downward]
 *                 description: Direction of the train
 *               stations:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of stations the train will stop at
 *     responses:
 *       201:
 *         description: Train created successfully
 *       400:
 *         description: Bad request, invalid input
 */
router.post('/', trainController.createTrain);

/**
 * @swagger
 * /trains/{train_id}:
 *   put:
 *     summary: Update an existing train by ID
 *     tags: [Trains]
 *     parameters:
 *       - in: path
 *         name: train_id
 *         required: true
 *         description: Unique identifier for the train to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               train_name:
 *                 type: string
 *                 description: Updated name of the train
 *               route_id:
 *                 type: string
 *                 description: Updated route ID associated with the train
 *               direction:
 *                 type: string
 *                 enum: [upward, downward]
 *                 description: Updated direction of the train
 *               stations:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Updated list of stations the train will stop at
 *     responses:
 *       200:
 *         description: Train updated successfully
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: Train not found
 */
router.put('/:train_id', trainController.updateTrain);

/**
 * @swagger
 * /trains/{train_id}:
 *   delete:
 *     summary: Delete a train by ID
 *     tags: [Trains]
 *     parameters:
 *       - in: path
 *         name: train_id
 *         required: true
 *         description: Unique identifier for the train to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Train deleted successfully
 *       404:
 *         description: Train not found
 */
router.delete('/:train_id', trainController.deleteTrain);

/**
 * @swagger
 * /trains:
 *   get:
 *     summary: Get all trains
 *     tags: [Trains]
 *     responses:
 *       200:
 *         description: Successfully fetched all trains
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   train_id:
 *                     type: string
 *                     description: Unique identifier for the train
 *                   train_name:
 *                     type: string
 *                     description: Name of the train
 *                   route_id:
 *                     type: string
 *                     description: Route ID associated with the train
 *                   direction:
 *                     type: string
 *                     enum: [upward, downward]
 *                     description: Direction of the train
 *                   stations:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of stations the train will stop at
 *       500:
 *         description: Internal server error
 */
router.get('/', trainController.getAllTrains);

/**
 * @swagger
 * /trains/{train_id}:
 *   get:
 *     summary: Get a train by ID
 *     tags: [Trains]
 *     parameters:
 *       - in: path
 *         name: train_id
 *         required: true
 *         description: Unique identifier for the train to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched the train
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 train_id:
 *                   type: string
 *                   description: Unique identifier for the train
 *                 train_name:
 *                   type: string
 *                   description: Name of the train
 *                 route_id:
 *                   type: string
 *                   description: Route ID associated with the train
 *                 direction:
 *                   type: string
 *                   enum: [upward, downward]
 *                   description: Direction of the train
 *                 stations:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: List of stations the train will stop at
 *       404:
 *         description: Train not found
 *       500:
 *         description: Internal server error
 */
router.get('/:train_id', trainController.getTrainById);

/**
 * @swagger
 * /trains/byRoute/{route_id}:
 *   get:
 *     summary: Get trains by route ID
 *     tags: [Trains]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         description: Route ID to fetch trains for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched trains for the route
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   train_id:
 *                     type: string
 *                     description: Unique identifier for the train
 *                   train_name:
 *                     type: string
 *                     description: Name of the train
 *                   route_id:
 *                     type: string
 *                     description: Route ID associated with the train
 *                   direction:
 *                     type: string
 *                     enum: [upward, downward]
 *                     description: Direction of the train
 *                   stations:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of stations the train will stop at
 *       404:
 *         description: No trains found for the route ID
 *       500:
 *         description: Internal server error
 */
router.get('/byRoute/:route_id', trainController.getTrainsByRoute);

/**
 * @swagger
 * /trains/route/{route_id}:
 *   get:
 *     summary: Get trains by route ID (alternative endpoint)
 *     tags: [Trains]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         description: Route ID to fetch trains for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched trains for the route
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   train_id:
 *                     type: string
 *                     description: Unique identifier for the train
 *                   train_name:
 *                     type: string
 *                     description: Name of the train
 *                   route_id:
 *                     type: string
 *                     description: Route ID associated with the train
 *                   direction:
 *                     type: string
 *                     enum: [upward, downward]
 *                     description: Direction of the train
 *                   stations:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: List of stations the train will stop at
 *       404:
 *         description: No trains found for the route ID
 *       500:
 *         description: Internal server error
 */
router.get('/route/:route_id', trainController.getTrainsByRouteId);

module.exports = router;

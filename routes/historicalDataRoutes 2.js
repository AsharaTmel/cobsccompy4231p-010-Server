const express = require('express');
const router = express.Router();
const historicalDataController = require('../controllers/historicalDataController');

/**
 * @swagger
 * tags:
 *   name: HistoricalData
 *   description: API endpoints for managing historical data
 */

/**
 * @swagger
 * /historical-data/save:
 *   post:
 *     summary: Save historical data
 *     tags: [HistoricalData]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               engine_id:
 *                 type: string
 *                 description: Unique identifier for the engine
 *               train_name:
 *                 type: string
 *                 description: Name of the train
 *               direction:
 *                 type: string
 *                 description: Direction of the train
 *               start_time:
 *                 type: string
 *                 format: date-time
 *                 description: Start time of the journey
 *               start_location:
 *                 type: string
 *                 description: Starting location of the train
 *               current_location:
 *                 type: string
 *                 description: Current location of the train
 *               estimated_end_time:
 *                 type: string
 *                 format: date-time
 *                 description: Estimated end time of the journey
 *               locations:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     station:
 *                       type: string
 *                       description: Name of the station
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp of the station
 *     responses:
 *       200:
 *         description: Historical data saved successfully
 *       500:
 *         description: Error saving historical data
 */
router.post('/save', async (req, res) => {
  try {
    await historicalDataController.saveHistoricalData(req.body);
    res.status(200).send('Historical data saved');
  } catch (error) {
    res.status(500).send('Error saving historical data');
  }
});

/**
 * @swagger
 * /historical-data:
 *   get:
 *     summary: Get historical data
 *     tags: [HistoricalData]
 *     responses:
 *       200:
 *         description: Successfully fetched historical data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   engine_id:
 *                     type: string
 *                     description: Unique identifier for the engine
 *                   train_name:
 *                     type: string
 *                     description: Name of the train
 *                   direction:
 *                     type: string
 *                     description: Direction of the train
 *                   start_time:
 *                     type: string
 *                     format: date-time
 *                     description: Start time of the journey
 *                   start_location:
 *                     type: string
 *                     description: Starting location of the train
 *                   current_location:
 *                     type: string
 *                     description: Current location of the train
 *                   estimated_end_time:
 *                     type: string
 *                     format: date-time
 *                     description: Estimated end time of the journey
 *                   locations:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         station:
 *                           type: string
 *                           description: Name of the station
 *                         timestamp:
 *                           type: string
 *                           format: date-time
 *                           description: Timestamp of the station
 *       500:
 *         description: Failed to fetch historical data
 */
router.get('/', async (req, res) => {
  try {
    const data = await historicalDataController.getHistoricalData();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch historical data' });
  }
});

module.exports = router;

const Engine = require('../models/Engine');
const FullTrain = require('../models/FullTrain'); 
const Train = require('../models/Train');
const Route = require('../models/Route');
const { generateRealTimeData } = require('../services/dataGenerationService'); // Importing the service module

/**
 * @swagger
 * /api/engines:
 *   post:
 *     summary: Create a new engine
 *     description: Create a new engine with the provided data.
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
 *       400:
 *         description: Bad request
 */
exports.createEngine = async (req, res) => {
  try {
    const engine = new Engine(req.body);
    await engine.save();
    res.status(201).json(engine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/engines/{engine_id}:
 *   put:
 *     summary: Update an existing engine
 *     description: Update the engine details with the provided engine ID.
 *     parameters:
 *       - in: path
 *         name: engine_id
 *         required: true
 *         description: The ID of the engine to update
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
 *       400:
 *         description: Bad request
 */
exports.updateEngine = async (req, res) => {
  try {
    const engine = await Engine.findOneAndUpdate(
      { engine_id: req.params.engine_id },
      req.body,
      { new: true }
    );
    if (!engine) return res.status(404).json({ error: 'Engine not found' });
    res.json(engine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/engines/{engine_id}:
 *   delete:
 *     summary: Delete an engine
 *     description: Delete the engine with the specified engine ID.
 *     parameters:
 *       - in: path
 *         name: engine_id
 *         required: true
 *         description: The ID of the engine to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Engine deleted successfully
 *       404:
 *         description: Engine not found
 *       400:
 *         description: Bad request
 */
exports.deleteEngine = async (req, res) => {
  try {
    const engine = await Engine.findOneAndDelete({ engine_id: req.params.engine_id });
    if (!engine) return res.status(404).json({ error: 'Engine not found' });
    res.json({ message: 'Engine deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/engines:
 *   get:
 *     summary: Get all engines
 *     description: Retrieve a list of all engines.
 *     responses:
 *       200:
 *         description: List of all engines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Engine'
 *       400:
 *         description: Bad request
 */
exports.getAllEngines = async (req, res) => {
  try {
    const engines = await Engine.find();
    res.json(engines);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/engines/{engine_id}:
 *   get:
 *     summary: Get engine by ID
 *     description: Retrieve the engine with the specified engine ID.
 *     parameters:
 *       - in: path
 *         name: engine_id
 *         required: true
 *         description: The ID of the engine to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Engine details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Engine'
 *       404:
 *         description: Engine not found
 *       400:
 *         description: Bad request
 */
exports.getEngineById = async (req, res) => {
  try {
    const engine = await Engine.findOne({ engine_id: req.params.engine_id });
    if (!engine) return res.status(404).json({ error: 'Engine not found' });
    res.json(engine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /api/engines/{engine_id}/real-time-data:
 *   get:
 *     summary: Get real-time data for an engine
 *     description: Retrieve real-time data for the engine with the specified engine ID.
 *     parameters:
 *       - in: path
 *         name: engine_id
 *         required: true
 *         description: The ID of the engine to retrieve real-time data for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Real-time data for the engine
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 engine_id:
 *                   type: string
 *                   description: The ID of the engine
 *                 realTimeData:
 *                   type: object
 *                   description: The real-time data for the engine
 *       404:
 *         description: Engine or related data not found
 *       400:
 *         description: Bad request
 */
exports.getRealTimeData = async (req, res) => {
  try {
    const engine = await Engine.findOne({ engine_id: req.params.engine_id });
    if (!engine) return res.status(404).json({ error: 'Engine not found' });

    const fullTrain = await FullTrain.findOne({ engine_id: engine.engine_id });
    if (!fullTrain) return res.status(404).json({ error: 'FullTrain not found' });

    const train = await Train.findOne({ train_id: fullTrain.train_id });
    if (!train) return res.status(404).json({ error: 'Train not found' });

    const route = await Route.findOne({ route_id: train.route_id });
    if (!route) return res.status(404).json({ error: 'Route not found' });

    // Exclude start_time, start_location, and estimated_end_time from response
    const realTimeData = generateRealTimeData(train, route, engine);
    const { start_time, start_location, estimated_end_time, ...filteredData } = realTimeData;

    res.json({
      engine_id: engine.engine_id,
      ...filteredData
    });
  } catch (error) {
    console.error('Error fetching real-time data:', error.message);
    res.status(400).json({ error: error.message });
  }
};

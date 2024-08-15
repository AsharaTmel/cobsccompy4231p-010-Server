// engineController.js

const Engine = require('../models/Engine');
const FullTrain = require('../models/FullTrain'); 
const Train = require('../models/Train');
const Route = require('../models/Route');
const { generateRealTimeData } = require('../services/dataGenerationService'); // Importing the service module

// Create Engine
exports.createEngine = async (req, res) => {
  try {
    const engine = new Engine(req.body);
    await engine.save();
    res.status(201).json(engine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Engine
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

// Delete Engine
exports.deleteEngine = async (req, res) => {
  try {
    const engine = await Engine.findOneAndDelete({ engine_id: req.params.engine_id });
    if (!engine) return res.status(404).json({ error: 'Engine not found' });
    res.json({ message: 'Engine deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Engines
exports.getAllEngines = async (req, res) => {
  try {
    const engines = await Engine.find();
    res.json(engines);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Engine by ID
exports.getEngineById = async (req, res) => {
  try {
    const engine = await Engine.findOne({ engine_id: req.params.engine_id });
    if (!engine) return res.status(404).json({ error: 'Engine not found' });
    res.json(engine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// /controllers/engineController.js

exports.getRealTimeData = async (req, res) => {
  try {
    const engine = await Engine.findOne({ engine_id: req.params.engine_id });
    if (!engine) return res.status(404).json({ error: 'Engine not found' });

    console.log('Engine found:', engine); // Debug log

    const fullTrain = await FullTrain.findOne({ engine_id: engine.engine_id });
    if (!fullTrain) return res.status(404).json({ error: 'FullTrain not found' });

    console.log('FullTrain found:', fullTrain); // Debug log

    const train = await Train.findOne({ train_id: fullTrain.train_id });
    if (!train) return res.status(404).json({ error: 'Train not found' });

    console.log('Train found:', train); // Debug log

    const route = await Route.findOne({ route_id: train.route_id });
    if (!route) return res.status(404).json({ error: 'Route not found' });

    console.log('Route found:', route); // Debug log

    const realTimeData = generateRealTimeData(train, route, engine);

    res.json({
      engine_id: engine.engine_id,
      ...realTimeData
    });
  } catch (error) {
    console.error('Error fetching real-time data:', error.message);
    res.status(400).json({ error: error.message });
  }
};

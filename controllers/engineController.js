// engineController.js

const Engine = require('../models/Engine');
const FullTrain = require('../models/Fulltrain'); // Ensure this matches the model name

const Train = require('../models/Train');
const Route = require('../models/Route');

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

// Get Real-Time Data for Engine
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

    // Randomly generate direction
    const directions = ['upward', 'downward'];
    const direction = directions[Math.floor(Math.random() * directions.length)];

    // Randomly generate start time
    const startTime = new Date();
    const totalDuration = route.details.total_duration_minutes;
    const endTime = new Date(startTime.getTime() + totalDuration * 60000);

    // Determine start and end locations based on direction
    const stations = train.stations;
    let startLocation, endLocation, currentLocation;

    if (direction === 'upward') {
      startLocation = stations[0];
      endLocation = stations[stations.length - 1];
      currentLocation = startLocation;
    } else {
      startLocation = stations[stations.length - 1];
      endLocation = stations[0];
      currentLocation = startLocation;
    }

    // Generate a sequence of locations
    const locations = [];
    let currentIndex = direction === 'upward' ? 0 : stations.length - 1;
    const step = direction === 'upward' ? 1 : -1;

    while ((direction === 'upward' && currentIndex < stations.length) || (direction === 'downward' && currentIndex >= 0)) {
      locations.push({
        station: stations[currentIndex],
        timestamp: new Date(startTime.getTime() + (locations.length * (Math.random() * (60 - 40) + 1)) * 60000) // Random time within 1-15 minutes intervals
      });
      currentIndex += step;
    }

    res.json({
      engine_id: engine.engine_id,
      train_name: train.train_name,
      direction: direction,
      start_time: startTime,
      start_location: startLocation,
      current_location: locations[0], // The initial location
      estimated_end_time: endTime,
      end_location: endLocation,
      locations: locations
    });
  } catch (error) {
    console.error('Error fetching real-time data:', error.message);
    res.status(400).json({ error: error.message });
  }
};
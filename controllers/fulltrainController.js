const FullTrain = require('../models/Fulltrain');
const axios = require('axios'); // For making HTTP requests

// Create FullTrain
exports.createFullTrain = async (req, res) => {
  try {
    const fullTrain = new FullTrain(req.body);
    await fullTrain.save();
    res.status(201).json(fullTrain);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Unassign Train from Engine
exports.unassignTrain = async (req, res) => {
  try {
    const fullTrain = await FullTrain.findByIdAndDelete(req.params.fulltrain_id);
    if (!fullTrain) return res.status(404).json({ error: 'FullTrain not found' });
    res.json({ message: 'FullTrain unassigned' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update FullTrain
exports.updateFullTrain = async (req, res) => {
  try {
    const fullTrain = await FullTrain.findByIdAndUpdate(req.params.fulltrain_id, req.body, { new: true });
    if (!fullTrain) return res.status(404).json({ error: 'FullTrain not found' });
    res.json(fullTrain);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All FullTrains
exports.getAllFullTrains = async (req, res) => {
  try {
    const fullTrains = await FullTrain.find();
    res.json(fullTrains);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single FullTrain by ID
exports.getFullTrainById = async (req, res) => {
  try {
    const fullTrain = await FullTrain.findOne({ fulltrain_id: req.params.fulltrain_id });
    if (!fullTrain) return res.status(404).json({ error: 'FullTrain not found' });
    res.json(fullTrain);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// Get Real-Time Data for All Full Trains
// Get Real-Time Data for All Full Trains
exports.getAllFullTrainsRealTimeData = async (req, res) => {
  try {
    // Fetch all full trains
    const fullTrains = await FullTrain.find();
    console.log('Fetched full trains:', fullTrains); // Add logging here

    if (fullTrains.length === 0) {
      return res.status(404).json({ error: 'FullTrain not found' });
    }

    // Create an array of promises for real-time data requests
    const realTimeDataPromises = fullTrains.map(async (fullTrain) => {
      try {
        const engine_id = fullTrain.engine_id;
        console.log('Fetching real-time data for engine_id:', engine_id); // Add logging here

        // Fetch real-time data using engine_id
        const response = await axios.get(`http://localhost:5001/api/engines/${engine_id}/realtime`);
        return {
          fulltrain_id: fullTrain.fulltrain_id,
          train_id: fullTrain.train_id,
          engine_id: engine_id,
          realTimeData: response.data,
        };
      } catch (error) {
        console.error(`Error fetching real-time data for engine ${engine_id}:`, error.message);
        return {
          fulltrain_id: fullTrain.fulltrain_id,
          train_id: fullTrain.train_id,
          engine_id: engine_id,
          error: 'Error fetching real-time data',
        };
      }
    });

    // Resolve all promises and send the response
    const realTimeDataResults = await Promise.all(realTimeDataPromises);
    res.json(realTimeDataResults);
  } catch (error) {
    console.error('Error fetching real-time data for all full trains:', error.message);
    res.status(500).json({ error: error.message });
  }
};

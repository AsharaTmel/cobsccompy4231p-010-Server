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
    const { engine_id } = req.body;

    // Check if the engine_id is already assigned to another train
    if (engine_id) {
      const existingFullTrain = await FullTrain.findOne({ engine_id });
      if (existingFullTrain) {
        return res.status(400).json({ error: 'This engine is already assigned to another train' });
      }
    }

    // Proceed with updating the full train
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
exports.getAllFullTrainsRealTimeData = async (req, res) => {
  try {
    // Fetch all full trains
    const fullTrains = await FullTrain.find();
    console.log('Fetched full trains:', fullTrains); // Add logging here

    if (fullTrains.length === 0) {
      return res.status(404).json({ error: 'No FullTrains found' });
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

// Get FullTrains by Train ID
exports.getFullTrainsByTrainId = async (req, res) => {
  try {
    const train_id = req.params.train_id;
    const fullTrains = await FullTrain.find({ train_id: train_id });
    
    if (fullTrains.length === 0) {
      return res.status(404).json({ error: 'No FullTrains found for this Train ID' });
    }
    
    res.json(fullTrains);
  } catch (error) {
    console.error('Error fetching FullTrains by Train ID:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Update FullTrain by Train ID
exports.updateFullTrainByTrainId = async (req, res) => {
  try {
    const { train_id } = req.params;
    const { engine_id } = req.body;

    // Check if the engine_id is already assigned to another train
    if (engine_id) {
      const existingFullTrain = await FullTrain.findOne({ engine_id });
      if (existingFullTrain && existingFullTrain.train_id !== train_id) {
        return res.status(400).json({ error: 'This engine is already assigned to another train' });
      }
    }

    // Proceed with updating the full train
    const fullTrain = await FullTrain.findOneAndUpdate(
      { train_id: train_id },
      { engine_id: engine_id },
      { new: true }
    );
    
    if (!fullTrain) return res.status(404).json({ error: 'FullTrain not found' });

    res.json(fullTrain);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Unassign Engine from a Train
exports.unassignEngine = async (req, res) => {
  try {
    const { train_id } = req.params;

    // Check if the train has an engine assigned
    const fullTrain = await FullTrain.findOne({ train_id });
    if (!fullTrain || fullTrain.engine_id === 'unassigned') {
      return res.status(404).json({ error: 'Engine is not assigned to this train' });
    }

    // Unassign the engine
    fullTrain.engine_id = 'unassigned';
    await fullTrain.save();

    res.json({ message: 'Engine unassigned from train' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Assign Engine to a Train
exports.assignEngine = async (req, res) => {
  try {
    const { train_id, engine_id } = req.body;

    // Check if all required fields are provided
    if (!train_id || !engine_id) {
      return res.status(400).json({ error: 'Both train_id and engine_id are required' });
    }

    // Check if the engine is already assigned to another train
    const existingAssignment = await FullTrain.findOne({ engine_id });
    if (existingAssignment && existingAssignment.train_id !== train_id) {
      return res.status(400).json({ error: 'This engine is already assigned to another train' });
    }

    // Check if the train is already assigned an engine
    const existingTrain = await FullTrain.findOne({ train_id });
    if (existingTrain && existingTrain.engine_id !== 'unassigned') {
      return res.status(400).json({ error: 'This train already has an assigned engine' });
    }

    // Assign the engine to the train
    const fullTrain = await FullTrain.findOneAndUpdate(
      { train_id },
      { engine_id },
      { new: true }
    );

    if (!fullTrain) return res.status(404).json({ error: 'Train not found' });

    res.json(fullTrain);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

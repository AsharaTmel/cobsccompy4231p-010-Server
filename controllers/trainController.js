const Train = require('../models/Train');

// Create Train
exports.createTrain = async (req, res) => {
  try {
    const train = new Train(req.body);
    await train.save();
    res.status(201).json(train);
  } catch (error) {
    console.error('Error creating train:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Update Train
exports.updateTrain = async (req, res) => {
  try {
    const train = await Train.findOneAndUpdate({ train_id: req.params.train_id }, req.body, { new: true });
    if (!train) {
      console.warn('Train not found for update:', req.params.train_id);
      return res.status(404).json({ error: 'Train not found' });
    }
    res.json(train);
  } catch (error) {
    console.error('Error updating train:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Delete Train
exports.deleteTrain = async (req, res) => {
  try {
    const train = await Train.findOneAndDelete({ train_id: req.params.train_id });
    if (!train) {
      console.warn('Train not found for deletion:', req.params.train_id);
      return res.status(404).json({ error: 'Train not found' });
    }
    res.json({ message: 'Train deleted' });
  } catch (error) {
    console.error('Error deleting train:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get All Trains
exports.getAllTrains = async (req, res) => {
  try {
    const trains = await Train.find();
    res.json(trains);
  } catch (error) {
    console.error('Error fetching trains:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get Train by ID
exports.getTrainById = async (req, res) => {
  try {
    const train = await Train.findOne({ train_id: req.params.train_id });
    if (!train) {
      console.warn('Train not found for ID:', req.params.train_id);
      return res.status(404).json({ error: 'Train not found' });
    }
    res.json(train);
  } catch (error) {
    console.error('Error fetching train by ID:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get Trains by Route
exports.getTrainsByRoute = async (req, res) => {
  try {
    const { route_id } = req.params;
    const trains = await Train.find({ route_id }); // Adjust the query based on your schema
    if (trains.length === 0) {
      console.warn('No trains found for route ID:', route_id);
      return res.status(404).json({ error: 'No trains found for this route' });
    }
    res.json(trains);
  } catch (error) {
    console.error('Error retrieving trains by route:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get Trains by Route ID
exports.getTrainsByRouteId = async (req, res) => {
  try {
    const route_id = req.params.route_id;
    const trains = await Train.find({ route_id: route_id }); // Adjust the query based on your schema
    if (trains.length === 0) {
      console.warn('No trains found for route ID:', route_id);
      return res.status(404).json({ error: 'No trains found for this route' });
    }
    res.json(trains);
  } catch (error) {
    console.error('Error retrieving trains by route ID:', error.message);
    res.status(400).json({ error: error.message });
  }
};


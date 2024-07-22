const express = require('express');
const router = express.Router();
const Train = require('../models/Train');

// Get all trains
router.get('/', async (req, res) => {
  try {
    const trains = await Train.find();
    res.json(trains);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific train by ID
router.get('/:id', async (req, res) => {
  try {
    const train = await Train.findById(req.params.id);
    if (!train) return res.status(404).json({ message: 'Train not found' });
    res.json(train);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new train
router.post('/', async (req, res) => {
  const train = new Train(req.body);
  try {
    const newTrain = await train.save();
    res.status(201).json(newTrain);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a train
router.patch('/:id', async (req, res) => {
  try {
    const train = await Train.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!train) return res.status(404).json({ message: 'Train not found' });
    res.json(train);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a train
router.delete('/:id', async (req, res) => {
  try {
    const train = await Train.findByIdAndDelete(req.params.id);
    if (!train) return res.status(404).json({ message: 'Train not found' });
    res.json({ message: 'Train deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

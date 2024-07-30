const express = require('express');
const router = express.Router();
const Train = require('../models/Train'); // Ensure this path is correct

// Get all trains
router.get('/', async (req, res) => {
  try {
    const trains = await Train.find(); // Fetch all trains
    res.json(trains); // Send trains as JSON response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
});

// Get a specific train by ID
router.get('/:id', async (req, res) => {
  try {
    const train = await Train.findById(req.params.id); // Fetch train by ID
    if (!train) return res.status(404).json({ message: 'Train not found' });
    res.json(train); // Send train as JSON response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
});

// Create a new train
router.post('/', async (req, res) => {
  const train = new Train(req.body); // Create a new train instance
  try {
    const newTrain = await train.save(); // Save train to database
    res.status(201).json(newTrain); // Send created train as JSON response
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handle errors
  }
});

// Update a train
router.patch('/:id', async (req, res) => {
  try {
    const train = await Train.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update train
    if (!train) return res.status(404).json({ message: 'Train not found' });
    res.json(train); // Send updated train as JSON response
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handle errors
  }
});

// Delete a train
router.delete('/:id', async (req, res) => {
  try {
    const train = await Train.findByIdAndDelete(req.params.id); // Delete train by ID
    if (!train) return res.status(404).json({ message: 'Train not found' });
    res.json({ message: 'Train deleted' }); // Confirm deletion
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
});

module.exports = router;

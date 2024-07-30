const express = require('express');
const router = express.Router();
const Route = require('../models/Route'); // Ensure this path is correct

// Get all routes
router.get('/', async (req, res) => {
  try {
    const routes = await Route.find(); // Fetch all routes
    res.json(routes); // Send routes as JSON response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
});

// Get a specific route by ID
router.get('/:id', async (req, res) => {
  try {
    const route = await Route.findById(req.params.id); // Fetch route by ID
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json(route); // Send route as JSON response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
});

// Create a new route
router.post('/', async (req, res) => {
  const route = new Route(req.body); // Create a new route instance
  try {
    const newRoute = await route.save(); // Save route to database
    res.status(201).json(newRoute); // Send created route as JSON response
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handle errors
  }
});

// Update a route
router.patch('/:id', async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update route
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json(route); // Send updated route as JSON response
  } catch (err) {
    res.status(400).json({ message: err.message }); // Handle errors
  }
});

// Delete a route
router.delete('/:id', async (req, res) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id); // Delete route by ID
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json({ message: 'Route deleted' }); // Confirm deletion
  } catch (err) {
    res.status(500).json({ message: err.message }); // Handle errors
  }
});

module.exports = router;

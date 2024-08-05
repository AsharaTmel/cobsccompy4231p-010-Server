// routeRoutes.js
const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');  // Ensure the path is correct
const engineController = require('../controllers/engineController'); // Import the correct controller

// Create Train
router.post('/', trainController.createTrain);

// Update Train
router.put('/:train_id', trainController.updateTrain);

// Delete Train
router.delete('/:train_id', trainController.deleteTrain);

// Get All Trains
router.get('/', trainController.getAllTrains);

// Get Train by ID
router.get('/:train_id', trainController.getTrainById);

// Get Real-Time Train Data (using engineController)
router.get('/:train_id/realtime', engineController.getRealTimeData);

module.exports = router;

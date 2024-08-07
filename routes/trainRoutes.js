const express = require('express');
const router = express.Router();
const trainController = require('../controllers/trainController');

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

// Get Trains by Route
router.get('/byRoute/:route_id', trainController.getTrainsByRoute);

// Get Trains by Route ID
router.get('/route/:route_id', trainController.getTrainsByRouteId);


module.exports = router;

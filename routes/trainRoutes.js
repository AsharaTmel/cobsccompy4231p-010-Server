// trainRoutes.js

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

module.exports = router;

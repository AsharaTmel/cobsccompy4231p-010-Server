const express = require('express');
const router = express.Router();
const fullTrainController = require('../controllers/fulltrainController');

// Create a new FullTrain
router.post('/', fullTrainController.createFullTrain);

// Unassign a FullTrain (delete by ID)
router.delete('/:fulltrain_id', fullTrainController.unassignTrain);

// Update a FullTrain (by ID)
router.put('/:fulltrain_id', fullTrainController.updateFullTrain);

// Get all FullTrains
router.get('/', fullTrainController.getAllFullTrains);

// Get a single FullTrain by ID
router.get('/:fulltrain_id', fullTrainController.getFullTrainById);

// Get Real-Time Data for All Full Trains
router.get('/realtime', fullTrainController.getAllFullTrainsRealTimeData);

// Get FullTrains by Train ID
router.get('/train/:train_id', fullTrainController.getFullTrainsByTrainId);

module.exports = router;

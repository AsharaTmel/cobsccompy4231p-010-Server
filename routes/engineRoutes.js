// engineRoutes.js

const express = require('express');
const router = express.Router();
const engineController = require('../controllers/engineController');

// Route to get all engines
router.get('/', engineController.getAllEngines);

// Route to get a specific engine by ID
router.get('/:engine_id', engineController.getEngineById);

// Route to create a new engine
router.post('/', engineController.createEngine);

// Route to update an existing engine
router.put('/:engine_id', engineController.updateEngine);

// Route to delete an engine
router.delete('/:engine_id', engineController.deleteEngine);

// Route to get real-time data for an engine
router.get('/:engine_id/realtime', engineController.getRealTimeData);

module.exports = router;

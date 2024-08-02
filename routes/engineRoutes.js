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

module.exports = router;

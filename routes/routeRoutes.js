const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController'); // Correct controller import

// Create Route
router.post('/', routeController.createRoute);

// Update Route
router.put('/:route_id', routeController.updateRoute);

// Delete Route
router.delete('/:route_id', routeController.deleteRoute);

// Get All Routes
router.get('/', routeController.getAllRoutes);

// Get Route by ID
router.get('/:route_id', routeController.getRouteById);

module.exports = router;

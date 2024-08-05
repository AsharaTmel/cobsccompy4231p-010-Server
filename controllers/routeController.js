const Route = require('../models/Route');

// Create Route
exports.createRoute = async (req, res) => {
  try {
    const route = new Route(req.body);
    await route.save();
    res.status(201).json(route);
  } catch (error) {
    console.error('Error creating route:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Update Route
exports.updateRoute = async (req, res) => {
  try {
    const route = await Route.findOneAndUpdate({ route_id: req.params.route_id }, req.body, { new: true });
    if (!route) {
      console.warn('Route not found for update:', req.params.route_id);
      return res.status(404).json({ error: 'Route not found' });
    }
    res.json(route);
  } catch (error) {
    console.error('Error updating route:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Delete Route
exports.deleteRoute = async (req, res) => {
  try {
    const route = await Route.findOneAndDelete({ route_id: req.params.route_id });
    if (!route) {
      console.warn('Route not found for deletion:', req.params.route_id);
      return res.status(404).json({ error: 'Route not found' });
    }
    res.json({ message: 'Route deleted' });
  } catch (error) {
    console.error('Error deleting route:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get All Routes
exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    console.error('Error fetching routes:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get Route by ID
exports.getRouteById = async (req, res) => {
  try {
    const route = await Route.findOne({ route_id: req.params.route_id });
    if (!route) {
      console.warn('Route not found for ID:', req.params.route_id);
      return res.status(404).json({ error: 'Route not found' });
    }
    res.json(route);
  } catch (error) {
    console.error('Error fetching route by ID:', error.message);
    res.status(400).json({ error: error.message });
  }
};
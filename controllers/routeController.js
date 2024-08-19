const Route = require('../models/Route');

/**
 * @swagger
 * /routes:
 *   post:
 *     summary: Create a new route
 *     tags: [Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       201:
 *         description: Route created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       400:
 *         description: Error creating route
 */
 /**
  * Creates a new route.
  * @param {Object} req - The request object containing route details in the body.
  * @param {Object} res - The response object to send the result.
  * @returns {void}
  */
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

/**
 * @swagger
 * /routes/{route_id}:
 *   put:
 *     summary: Update an existing route
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Route'
 *     responses:
 *       200:
 *         description: Route updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       404:
 *         description: Route not found
 *       400:
 *         description: Error updating route
 */
 /**
  * Updates an existing route by ID.
  * @param {Object} req - The request object containing the route ID in the parameters and updated details in the body.
  * @param {Object} res - The response object to send the result.
  * @returns {void}
  */
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

/**
 * @swagger
 * /routes/{route_id}:
 *   delete:
 *     summary: Delete an existing route
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Route deleted successfully
 *       404:
 *         description: Route not found
 *       400:
 *         description: Error deleting route
 */
 /**
  * Deletes an existing route by ID.
  * @param {Object} req - The request object containing the route ID in the parameters.
  * @param {Object} res - The response object to send the result.
  * @returns {void}
  */
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

/**
 * @swagger
 * /routes:
 *   get:
 *     summary: Get all routes
 *     tags: [Routes]
 *     responses:
 *       200:
 *         description: A list of all routes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Route'
 *       400:
 *         description: Error fetching routes
 */
 /**
  * Retrieves all routes from the database.
  * @param {Object} req - The request object.
  * @param {Object} res - The response object to send the result.
  * @returns {void}
  */
exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    console.error('Error fetching routes:', error.message);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /routes/{route_id}:
 *   get:
 *     summary: Get a route by ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Route found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Route'
 *       404:
 *         description: Route not found
 *       400:
 *         description: Error fetching route
 */
 /**
  * Retrieves a route by ID.
  * @param {Object} req - The request object containing the route ID in the parameters.
  * @param {Object} res - The response object to send the result.
  * @returns {void}
  */
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

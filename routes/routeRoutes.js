const express = require('express');
const router = express.Router();
const routeController = require('../controllers/routeController'); // Correct controller import

/**
 * @swagger
 * tags:
 *   name: Routes
 *   description: API endpoints for managing routes
 */

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
 *             type: object
 *             properties:
 *               route_id:
 *                 type: string
 *                 description: Unique identifier for the route
 *               route_name:
 *                 type: string
 *                 description: Name of the route
 *               details:
 *                 type: object
 *                 properties:
 *                   start_station:
 *                     type: string
 *                     description: Starting station of the route
 *                   end_station:
 *                     type: string
 *                     description: Ending station of the route
 *                   total_distance_km:
 *                     type: number
 *                     description: Total distance of the route in kilometers
 *                   total_duration_minutes:
 *                     type: number
 *                     description: Total duration of the route in minutes
 *     responses:
 *       201:
 *         description: Route created successfully
 *       400:
 *         description: Bad request, invalid input
 */
router.post('/', routeController.createRoute);

/**
 * @swagger
 * /routes/{route_id}:
 *   put:
 *     summary: Update an existing route by ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         description: Unique identifier for the route to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               route_name:
 *                 type: string
 *                 description: Updated name of the route
 *               details:
 *                 type: object
 *                 properties:
 *                   start_station:
 *                     type: string
 *                     description: Updated starting station of the route
 *                   end_station:
 *                     type: string
 *                     description: Updated ending station of the route
 *                   total_distance_km:
 *                     type: number
 *                     description: Updated total distance of the route in kilometers
 *                   total_duration_minutes:
 *                     type: number
 *                     description: Updated total duration of the route in minutes
 *     responses:
 *       200:
 *         description: Route updated successfully
 *       400:
 *         description: Bad request, invalid input
 *       404:
 *         description: Route not found
 */
router.put('/:route_id', routeController.updateRoute);

/**
 * @swagger
 * /routes/{route_id}:
 *   delete:
 *     summary: Delete a route by ID
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         description: Unique identifier for the route to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Route deleted successfully
 *       404:
 *         description: Route not found
 */
router.delete('/:route_id', routeController.deleteRoute);

/**
 * @swagger
 * /routes:
 *   get:
 *     summary: Get all routes
 *     tags: [Routes]
 *     responses:
 *       200:
 *         description: Successfully fetched all routes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   route_id:
 *                     type: string
 *                     description: Unique identifier for the route
 *                   route_name:
 *                     type: string
 *                     description: Name of the route
 *                   details:
 *                     type: object
 *                     properties:
 *                       start_station:
 *                         type: string
 *                         description: Starting station of the route
 *                       end_station:
 *                         type: string
 *                         description: Ending station of the route
 *                       total_distance_km:
 *                         type: number
 *                         description: Total distance of the route in kilometers
 *                       total_duration_minutes:
 *                         type: number
 *                         description: Total duration of the route in minutes
 *       500:
 *         description: Internal server error
 */
router.get('/', routeController.getAllRoutes);

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
 *         description: Unique identifier for the route to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully fetched the route
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 route_id:
 *                   type: string
 *                   description: Unique identifier for the route
 *                 route_name:
 *                   type: string
 *                   description: Name of the route
 *                 details:
 *                   type: object
 *                   properties:
 *                     start_station:
 *                       type: string
 *                       description: Starting station of the route
 *                     end_station:
 *                       type: string
 *                       description: Ending station of the route
 *                     total_distance_km:
 *                       type: number
 *                       description: Total distance of the route in kilometers
 *                     total_duration_minutes:
 *                       type: number
 *                       description: Total duration of the route in minutes
 *       404:
 *         description: Route not found
 *       500:
 *         description: Internal server error
 */
router.get('/:route_id', routeController.getRouteById);

module.exports = router;

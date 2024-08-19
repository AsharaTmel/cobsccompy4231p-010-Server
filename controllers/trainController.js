const Train = require('../models/Train');

/**
 * @swagger
 * /trains:
 *   post:
 *     summary: Create a new train
 *     tags: [Trains]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Train'
 *     responses:
 *       201:
 *         description: Train created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Train'
 *       400:
 *         description: Error creating train
 */
exports.createTrain = async (req, res) => {
  /**
   * Create a new train entry.
   * @param {object} req - The request object containing train data.
   * @param {object} res - The response object to send the result.
   * @throws {Error} If there is an error creating the train.
   */
  try {
    const train = new Train(req.body);
    await train.save();
    res.status(201).json(train);
  } catch (error) {
    console.error('Error creating train:', error.message);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /trains/{train_id}:
 *   put:
 *     summary: Update an existing train
 *     tags: [Trains]
 *     parameters:
 *       - in: path
 *         name: train_id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Train'
 *     responses:
 *       200:
 *         description: Train updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Train'
 *       404:
 *         description: Train not found
 *       400:
 *         description: Error updating train
 */
exports.updateTrain = async (req, res) => {
  /**
   * Update an existing train entry by its ID.
   * @param {object} req - The request object containing train ID and update data.
   * @param {object} res - The response object to send the result.
   * @throws {Error} If there is an error updating the train or the train is not found.
   */
  try {
    const train = await Train.findOneAndUpdate({ train_id: req.params.train_id }, req.body, { new: true });
    if (!train) {
      console.warn('Train not found for update:', req.params.train_id);
      return res.status(404).json({ error: 'Train not found' });
    }
    res.json(train);
  } catch (error) {
    console.error('Error updating train:', error.message);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /trains/{train_id}:
 *   delete:
 *     summary: Delete an existing train
 *     tags: [Trains]
 *     parameters:
 *       - in: path
 *         name: train_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Train deleted
 *       404:
 *         description: Train not found
 *       400:
 *         description: Error deleting train
 */
exports.deleteTrain = async (req, res) => {
  /**
   * Delete an existing train entry by its ID.
   * @param {object} req - The request object containing the train ID.
   * @param {object} res - The response object to send the result.
   * @throws {Error} If there is an error deleting the train or the train is not found.
   */
  try {
    const train = await Train.findOneAndDelete({ train_id: req.params.train_id });
    if (!train) {
      console.warn('Train not found for deletion:', req.params.train_id);
      return res.status(404).json({ error: 'Train not found' });
    }
    res.json({ message: 'Train deleted' });
  } catch (error) {
    console.error('Error deleting train:', error.message);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /trains:
 *   get:
 *     summary: Get all trains
 *     tags: [Trains]
 *     responses:
 *       200:
 *         description: A list of all trains
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Train'
 *       400:
 *         description: Error fetching trains
 */
exports.getAllTrains = async (req, res) => {
  /**
   * Retrieve all train entries.
   * @param {object} req - The request object.
   * @param {object} res - The response object to send the result.
   * @throws {Error} If there is an error fetching trains.
   */
  try {
    const trains = await Train.find();
    res.json(trains);
  } catch (error) {
    console.error('Error fetching trains:', error.message);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /trains/{train_id}:
 *   get:
 *     summary: Get a train by ID
 *     tags: [Trains]
 *     parameters:
 *       - in: path
 *         name: train_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Train found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Train'
 *       404:
 *         description: Train not found
 *       400:
 *         description: Error fetching train
 */
exports.getTrainById = async (req, res) => {
  /**
   * Retrieve a train entry by its ID.
   * @param {object} req - The request object containing the train ID.
   * @param {object} res - The response object to send the result.
   * @throws {Error} If there is an error fetching the train or the train is not found.
   */
  try {
    const train = await Train.findOne({ train_id: req.params.train_id });
    if (!train) {
      console.warn('Train not found for ID:', req.params.train_id);
      return res.status(404).json({ error: 'Train not found' });
    }
    res.json(train);
  } catch (error) {
    console.error('Error fetching train by ID:', error.message);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /trains/route/{route_id}:
 *   get:
 *     summary: Get trains by route ID
 *     tags: [Trains]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of trains for the route
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Train'
 *       404:
 *         description: No trains found for the route
 *       400:
 *         description: Error retrieving trains by route
 */
exports.getTrainsByRoute = async (req, res) => {
  /**
   * Retrieve trains for a specific route by route ID.
   * @param {object} req - The request object containing the route ID.
   * @param {object} res - The response object to send the result.
   * @throws {Error} If there is an error retrieving trains or no trains are found for the route.
   */
  try {
    const { route_id } = req.params;
    const trains = await Train.find({ route_id }); // Adjust the query based on your schema
    if (trains.length === 0) {
      console.warn('No trains found for route ID:', route_id);
      return res.status(404).json({ error: 'No trains found for this route' });
    }
    res.json(trains);
  } catch (error) {
    console.error('Error retrieving trains by route:', error.message);
    res.status(400).json({ error: error.message });
  }
};

/**
 * @swagger
 * /trains/route/{route_id}:
 *   get:
 *     summary: Get trains by route ID (alternative)
 *     tags: [Trains]
 *     parameters:
 *       - in: path
 *         name: route_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of trains for the route
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Train'
 *       404:
 *         description: No trains found for the route
 *       400:
 *         description: Error retrieving trains by route ID
 */
exports.getTrainsByRouteId = async (req, res) => {
  /**
   * Retrieve trains for a specific route by route ID (alternative method).
   * @param {object} req - The request object containing the route ID.
   * @param {object} res - The response object to send the result.
   * @throws {Error} If there is an error retrieving trains or no trains are found for the route.
   */
  try {
    const route_id = req.params.route_id;
    const trains = await Train.find({ route_id: route_id }); // Adjust the query based on your schema
    if (trains.length === 0) {
      console.warn('No trains found for route ID:', route_id);
      return res.status(404).json({ error: 'No trains found for this route' });
    }
    res.json(trains);
  } catch (error) {
    console.error('Error retrieving trains by route ID:', error.message);
    res.status(400).json({ error: error.message });
  }
};

const HistoricalData = require('../models/HistoricalData');

// Save historical data
/**
 * @swagger
 * /historicaldata:
 *   post:
 *     summary: Save historical data
 *     tags: [HistoricalData]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HistoricalData'
 *     responses:
 *       201:
 *         description: Historical data saved successfully
 *       400:
 *         description: Error saving historical data
 */
 /**
  * Saves historical data to the database.
  * @param {Object} data - The historical data to save.
  * @returns {void}
  */
const saveHistoricalData = async (data) => {
  try {
    const historicalData = new HistoricalData(data);
    await historicalData.save();
    console.log('Historical data saved');
  } catch (error) {
    console.error('Error saving historical data:', error);
  }
};

// Clean up old historical data (older than 90 days)
/**
 * @swagger
 * /historicaldata/cleanup:
 *   delete:
 *     summary: Clean up old historical data
 *     tags: [HistoricalData]
 *     responses:
 *       200:
 *         description: Old historical data cleaned up successfully
 *       400:
 *         description: Error cleaning up old historical data
 */
 /**
  * Deletes historical data older than 90 days.
  * @returns {void}
  */
const cleanupOldData = async () => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 90);
    await HistoricalData.deleteMany({ recorded_at: { $lt: cutoffDate } });
    console.log('Old historical data cleaned up');
  } catch (error) {
    console.error('Error cleaning up old historical data:', error);
  }
};

// Get historical data
/**
 * @swagger
 * /historicaldata:
 *   get:
 *     summary: Get historical data
 *     tags: [HistoricalData]
 *     responses:
 *       200:
 *         description: A list of historical data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HistoricalData'
 *       400:
 *         description: Error fetching historical data
 */
 /**
  * Retrieves the latest historical data from the database.
  * @returns {Promise<Array>} A promise that resolves to an array of historical data.
  * @throws {Error} Throws an error if there's an issue fetching the historical data.
  */
const getHistoricalData = async () => {
  try {
    const data = await HistoricalData.find()
      .sort({ timestamp: -1 })
      .limit(100);
    return data;
  } catch (error) {
    throw new Error('Error fetching historical data');
  }
};

module.exports = {
  saveHistoricalData,
  cleanupOldData,
  getHistoricalData
};

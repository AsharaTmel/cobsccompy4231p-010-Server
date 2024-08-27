const mongoose = require('mongoose');
const HistoricalData = require('../models/HistoricalData');

// Function to generate real-time data
const generateRealTimeData = (train, route, engine, lastUpdate) => {
  if (!train || !route || !engine) {
    throw new Error('Missing required data for real-time generation');
  }

  // Randomly determine the direction of the train
  const directions = ['upward', 'downward'];
  const direction = directions[Math.floor(Math.random() * directions.length)];

  // Reverse the stations array for downward direction
  const stations = direction === 'downward' ? [...train.stations].reverse() : train.stations;
  const totalDuration = route.details.total_duration_minutes;

  // Check if start time is stored
  let startTime = new Date(engine.start_time || null);

  if (!engine.start_time) {
    // Generate a random start time (e.g., within the last 24 hours)
    startTime = new Date(Date.now() - Math.floor(Math.random() * 24 * 60 * 60 * 1000));
    engine.start_time = startTime.toISOString(); // Save this start time in your database or persistent storage
  }

  // Calculate elapsed time and determine the current station
  const elapsedMinutes = Math.floor((new Date() - startTime) / 60000);
  const stationsCount = stations.length;
  const stationIndexPerMinute = totalDuration / stationsCount;
  let currentIndex;

  if (direction === 'upward') {
    currentIndex = Math.min(Math.floor(elapsedMinutes / stationIndexPerMinute), stationsCount - 1);
  } else {
    currentIndex = Math.max(stationsCount - 1 - Math.floor(elapsedMinutes / stationIndexPerMinute), 0);
  }

  // Get the current location and start location
  const currentLocation = stations[currentIndex];
  const startLocation = direction === 'upward' ? stations[0] : stations[stations.length - 1];

  // Calculate the estimated arrival time for the next station
  const nextStationTime = new Date(startTime.getTime() + (currentIndex + 1) * stationIndexPerMinute * 60000);

  // Prepare real-time data
  const realTimeData = {
    engine_id: engine.engine_id,
    train_name: train.train_name,
    direction: direction,
    start_time: startTime.toISOString(),  // Ensure start_time is in ISO format
    start_location: startLocation,
    current_location: currentLocation,
    estimated_end_time: nextStationTime.toISOString(),  // Ensure estimated_end_time is in ISO format
    locations: stations.map((station, index) => ({
      station,
      timestamp: new Date(startTime.getTime() + index * stationIndexPerMinute * 60000).toISOString()  // Ensure timestamp is in ISO format
    }))
  };

  // Save real-time data to HistoricalData collection
  saveHistoricalData(realTimeData);

  return realTimeData;
};

// Function to save historical data
const saveHistoricalData = async (data) => {
  try {
    const historicalData = new HistoricalData(data);
    await historicalData.save();
    console.log('Historical data saved');
  } catch (error) {
    console.error('Error saving historical data:', error);
  }
};

module.exports = { generateRealTimeData };

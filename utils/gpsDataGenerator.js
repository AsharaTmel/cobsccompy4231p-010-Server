const mongoose = require('mongoose');
const Train = require('../models/Train');
const axios = require('axios');

const API_BASE_URL = 'http://localhost:5001/api';

async function fetchStations(trainId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/trains/${trainId}`);
    return response.data.locations.map(loc => loc.station);
  } catch (error) {
    console.error(`Error fetching stations for train ${trainId}:`, error);
    return [];
  }
}

async function updateTrainLocation() {
  console.log('Updating train locations...'); // Log function execution

  try {
    const trains = await Train.find({ status: 'In Transit' });

    for (const train of trains) {
      const engineResponse = await axios.get(`${API_BASE_URL}/engines/${train.engine_id}/realtime`);
      const { direction, current_location } = engineResponse.data;

      const stations = await fetchStations(train.train_id);

      if (stations.length === 0) {
        console.error(`No stations found for train ${train.train_id}.`);
        continue;
      }

      let startIndex;
      let currentStations;

      if (direction === 'downward') {
        startIndex = stations.indexOf(current_location);
        if (startIndex === -1) {
          console.error(`Current location ${current_location} not found in stations.`);
          continue;
        }
        currentStations = stations.slice().reverse().slice(stations.length - startIndex - 1);
      } else {
        startIndex = stations.indexOf(current_location);
        if (startIndex === -1) {
          console.error(`Current location ${current_location} not found in stations.`);
          continue;
        }
        currentStations = stations.slice(startIndex + 1); // Move to the next station
      }

      const update = {
        currentLocation: currentStations[0] || 'End of Route',
        nextStop: currentStations[1] || 'End of Route',
        stationSequence: currentStations,
        currentIndex: (train.currentIndex + 1) % currentStations.length, // Cycle through stations
      };

      console.log(`Updating train ${train.train_name}:`);
      console.log(`Current Location: ${update.currentLocation}`);
      console.log(`Next Stop: ${update.nextStop}`);

      await Train.findByIdAndUpdate(train._id, update, { new: true });
    }

    console.log('Train locations updated successfully');
  } catch (err) {
    console.error('Error updating train locations:', err);
  }
}

// Log the start time and periodic updates
console.log(`Starting periodic updates every 30 seconds at ${new Date().toLocaleTimeString()}`);
setInterval(() => {
  console.log(`Running update at ${new Date().toLocaleTimeString()}`);
  updateTrainLocation();
}, 10 * 1000); // 30 seconds

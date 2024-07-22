// utils/gpsDataGenerator.js
const mongoose = require('mongoose');
const Train = require('../models/Train');

// Simulate train location update
async function updateTrainLocation() {
  try {
    const trains = await Train.find({ status: 'Scheduled' });

    trains.forEach(async (train) => {
      // Example of random location update logic
      const stations = [
        'Colombo Fort', 'Maradana', 'Ragama', 'Gampaha', 'Veyangoda',
        'Polgahawela', 'Rambukkana', 'Kandy', 'Peradeniya', 'Gampola',
        'Nawalapitiya', 'Hatton', 'Talawakele', 'Nanu Oya', 'Haputale',
        'Bandarawela', 'Ella', 'Badulla'
      ];

      const randomIndex = Math.floor(Math.random() * stations.length);
      const currentLocation = stations[randomIndex];
      const nextLocation = stations[randomIndex + 1] || 'End of Route';

      const update = {
        currentLocation,
        nextStop: nextLocation,
        status: 'In Transit'
      };

      await Train.findByIdAndUpdate(train._id, update, { new: true });
    });

    console.log('Train locations updated successfully');
  } catch (err) {
    console.error('Error updating train locations:', err);
  }
}

module.exports = updateTrainLocation;

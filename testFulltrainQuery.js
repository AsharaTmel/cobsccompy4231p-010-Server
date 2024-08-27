// testFulltrainQuery.js
const mongoose = require('mongoose');
const FullTrain = require('./models/Fulltrain');

// Replace with your MongoDB connection string
const mongoURI = 'mongodb+srv://asharakaveen7:bruiCE1228@nibm-railwayapp.ezixmfd.mongodb.net/Nibm-RailwayAppDB?retryWrites=true&w=majority';

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
    return FullTrain.find();
  })
  .then(fullTrains => {
    console.log('Fetched full trains:', fullTrains);
    mongoose.disconnect();
  })
  .catch(error => {
    console.error('Error:', error);
    mongoose.disconnect();
  });

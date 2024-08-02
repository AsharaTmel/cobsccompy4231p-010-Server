const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
const dbUri = 'mongodb+srv://asharakaveen7:bruiCE1228@nibm-railwayapp.ezixmfd.mongodb.net/Nibm-RailwayAppDB?retryWrites=true&w=majority';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/engines', require('./routes/engineRoutes'));
app.use('/api/trains', require('./routes/trainRoutes'));
app.use('/api/fulltrains', require('./routes/fulltrainRoutes'));
app.use('/api/routes', require('./routes/routeRoutes'));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://asharakaveen7:bruiCE1228@nibm-railwayapp.ezixmfd.mongodb.net/Nibm-RailwayAppDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
const trainRoutes = require('./routes/trains');
const routeRoutes = require('./routes/routes');

app.use('/api/trains', trainRoutes);
app.use('/api/routes', routeRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

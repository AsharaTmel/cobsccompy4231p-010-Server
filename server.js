const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

const mongoURI = 'mongodb+srv://asharakaveen7:bruiCE1228@nibm-railwayapp.ezixmfd.mongodb.net/Nibm-RailwayAppDB?retryWrites=true&w=majority&appName=Nibm-RailwayApp';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

const trainRoutes = require('./routes/trains');
const routeRoutes = require('./routes/routes');

app.use('/api/trains', trainRoutes);
app.use('/api/routes', routeRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

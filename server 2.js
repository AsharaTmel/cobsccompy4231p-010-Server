const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
const cron = require('node-cron'); // Import node-cron
const HistoricalData = require('./models/HistoricalData'); // Import HistoricalData model
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Import routes
const historicalDataRoutes = require('./routes/historicalDataRoutes');
const engineRoutes = require('./routes/engineRoutes');
const fulltrainRoutes = require('./routes/fulltrainRoutes');
const routeRoutes = require('./routes/routeRoutes');
const trainRoutes = require('./routes/trainRoutes');

const app = express();

// Swagger definition
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Sri Lanka Railways API',
      version: '1.0.0',
      description: 'API Documentation for the Sri Lanka Railways project',
      contact: {
        name: 'Your Name',
        email: 'your-email@example.com',
      },
      servers: [{ url: 'http://localhost:5001' }],
    },
  },
  apis: [
    './routes/*.js',  // Path to your route files
    './models/*.js',  // Path to your model files
    './controllers/*.js' // Path to your controller files
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// API Routes
app.use('/api/historical-data', historicalDataRoutes);
app.use('/api/engines', engineRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/fulltrains', fulltrainRoutes);
app.use('/api/routes', routeRoutes);

// Connect to MongoDB
const dbUri = 'mongodb+srv://asharakaveen7:bruiCE1228@nibm-railwayapp.ezixmfd.mongodb.net/Nibm-RailwayAppDB?retryWrites=true&w=majority';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the cleanup job
cron.schedule('0 0 * * *', async () => {
  // Runs every day at midnight

  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 90); // 90 days ago

    const result = await HistoricalData.deleteMany({
      createdAt: { $lt: cutoffDate }
    });

    console.log(`Cleanup job executed. Deleted ${result.deletedCount} old records.`);
  } catch (error) {
    console.error('Error executing cleanup job:', error);
  }
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

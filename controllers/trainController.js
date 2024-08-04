const Train = require('../models/Train');

// Create Train
exports.createTrain = async (req, res) => {
  try {
    const train = new Train(req.body);
    await train.save();
    res.status(201).json(train);
  } catch (error) {
    console.error('Error creating train:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Update Train
exports.updateTrain = async (req, res) => {
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

// Delete Train
exports.deleteTrain = async (req, res) => {
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

// Get All Trains
exports.getAllTrains = async (req, res) => {
  try {
    const trains = await Train.find();
    res.json(trains);
  } catch (error) {
    console.error('Error fetching trains:', error.message);
    res.status(400).json({ error: error.message });
  }
};

// Get Real-Time Train Data
exports.getRealTimeData = async (req, res) => {
  try {
    const train = await Train.findOne({ train_id: req.params.train_id });
    if (!train) {
      console.warn('Train not found for real-time data:', req.params.train_id);
      return res.status(404).json({ error: 'Train not found' });
    }

    const { direction, stations } = train;

    // Randomly select direction if not specified
    const randomDirection = direction || (Math.random() > 0.5 ? 'upward' : 'downward');
    
    // Randomly select a current station
    const currentIndex = Math.floor(Math.random() * stations.length);
    const currentStation = stations[currentIndex];
    
    // Determine next station based on direction
    let nextStation;
    if (randomDirection === 'upward') {
      nextStation = stations[currentIndex + 1] || 'End of Route';
    } else {
      nextStation = currentIndex > 0 ? stations[currentIndex - 1] : 'Start of Route';
    }

    const startTime = new Date(); // Placeholder
    const endTime = new Date(startTime.getTime() + 100 * 60 * 60 * 1000); // Placeholder
    const estimatedEndTime = endTime.toLocaleTimeString();

    res.json({
      direction: randomDirection,
      startStation: stations[0], // Assuming the first station is the start station
      endStation: stations[stations.length - 1], // Assuming the last station is the end station
      startTime,
      estimatedEndTime,
      currentStation,
      nextStation
    });
  } catch (error) {
    console.error('Error fetching real-time data:', error.message);
    res.status(400).json({ error: error.message });
  }
};

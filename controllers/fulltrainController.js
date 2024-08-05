// Create FullTrain
exports.createFullTrain = async (req, res) => {
  try {
    const fullTrain = new FullTrain(req.body);
    await fullTrain.save();
    res.status(201).json(fullTrain);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Unassign Train from Engine
exports.unassignTrain = async (req, res) => {
  try {
    const fullTrain = await FullTrain.findByIdAndDelete(req.params.fulltrain_id);
    if (!fullTrain) return res.status(404).json({ error: 'FullTrain not found' });
    res.json({ message: 'FullTrain unassigned' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update FullTrain
exports.updateFullTrain = async (req, res) => {
  try {
    const fullTrain = await FullTrain.findByIdAndUpdate(req.params.fulltrain_id, req.body, { new: true });
    if (!fullTrain) return res.status(404).json({ error: 'FullTrain not found' });
    res.json(fullTrain);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All FullTrains
exports.getAllFullTrains = async (req, res) => {
  try {
    const fullTrains = await FullTrain.find();
    res.json(fullTrains);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single FullTrain by ID
exports.getFullTrainById = async (req, res) => {
  try {
    const fullTrain = await FullTrain.findOne({ fulltrain_id: req.params.fulltrain_id });
    if (!fullTrain) return res.status(404).json({ error: 'FullTrain not found' });
    res.json(fullTrain);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
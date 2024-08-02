const Engine = require('../models/Engine');

// Create Engine
exports.createEngine = async (req, res) => {
  try {
    const engine = new Engine(req.body);
    await engine.save();
    res.status(201).json(engine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Engine
exports.updateEngine = async (req, res) => {
  try {
    const engine = await Engine.findOneAndUpdate(
      { engine_id: req.params.engine_id },
      req.body,
      { new: true }
    );
    if (!engine) return res.status(404).json({ error: 'Engine not found' });
    res.json(engine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Engine
exports.deleteEngine = async (req, res) => {
  try {
    const engine = await Engine.findOneAndDelete({ engine_id: req.params.engine_id });
    if (!engine) return res.status(404).json({ error: 'Engine not found' });
    res.json({ message: 'Engine deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Engines
exports.getAllEngines = async (req, res) => {
  try {
    const engines = await Engine.find();
    res.json(engines);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Engine by ID
exports.getEngineById = async (req, res) => {
  try {
    const engine = await Engine.findOne({ engine_id: req.params.engine_id });
    if (!engine) return res.status(404).json({ error: 'Engine not found' });
    res.json(engine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

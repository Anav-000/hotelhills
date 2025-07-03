const Banquet = require("../models/Banquet");

exports.getAllBanquets = async (req, res) => {
  try {
    const banquets = await Banquet.find();
    res.json(banquets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBanquetById = async (req, res) => {
  try {
    const banquet = await Banquet.findById(req.params.id);
    if (!banquet) return res.status(404).json({ error: "Banquet not found" });
    res.json(banquet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBanquet = async (req, res) => {
  try {
    const banquet = new Banquet(req.body);
    await banquet.save();
    res.status(201).json(banquet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateBanquet = async (req, res) => {
  try {
    const banquet = await Banquet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!banquet) return res.status(404).json({ error: "Banquet not found" });
    res.json(banquet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBanquet = async (req, res) => {
  try {
    const banquet = await Banquet.findByIdAndDelete(req.params.id);
    if (!banquet) return res.status(404).json({ error: "Banquet not found" });
    res.json({ message: "Banquet deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

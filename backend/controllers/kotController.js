const KOT = require("../models/KOT");

exports.getAllKOTs = async (req, res) => {
  try {
    const kots = await KOT.find().populate("table");
    res.json(kots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getKOTById = async (req, res) => {
  try {
    const kot = await KOT.findById(req.params.id).populate("table");
    if (!kot) return res.status(404).json({ error: "KOT not found" });
    res.json(kot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createKOT = async (req, res) => {
  try {
    const kot = new KOT(req.body);
    await kot.save();
    res.status(201).json(kot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateKOT = async (req, res) => {
  try {
    const kot = await KOT.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!kot) return res.status(404).json({ error: "KOT not found" });
    res.json(kot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteKOT = async (req, res) => {
  try {
    const kot = await KOT.findByIdAndDelete(req.params.id);
    if (!kot) return res.status(404).json({ error: "KOT not found" });
    res.json({ message: "KOT deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

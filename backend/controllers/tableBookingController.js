const TableBooking = require("../models/TableBooking");

exports.getAllTableBookings = async (req, res) => {
  try {
    const bookings = await TableBooking.find().populate("table guest");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTableBookingById = async (req, res) => {
  try {
    const booking = await TableBooking.findById(req.params.id).populate(
      "table guest"
    );
    if (!booking)
      return res.status(404).json({ error: "Table booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTableBooking = async (req, res) => {
  try {
    const booking = new TableBooking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateTableBooking = async (req, res) => {
  try {
    const booking = await TableBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!booking)
      return res.status(404).json({ error: "Table booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTableBooking = async (req, res) => {
  try {
    const booking = await TableBooking.findByIdAndDelete(req.params.id);
    if (!booking)
      return res.status(404).json({ error: "Table booking not found" });
    res.json({ message: "Table booking deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

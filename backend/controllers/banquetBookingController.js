const BanquetBooking = require("../models/BanquetBooking");

exports.getAllBanquetBookings = async (req, res) => {
  try {
    const bookings = await BanquetBooking.find().populate("banquet guest");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBanquetBookingById = async (req, res) => {
  try {
    const booking = await BanquetBooking.findById(req.params.id).populate(
      "banquet guest"
    );
    if (!booking)
      return res.status(404).json({ error: "Banquet booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBanquetBooking = async (req, res) => {
  try {
    const booking = new BanquetBooking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateBanquetBooking = async (req, res) => {
  try {
    const booking = await BanquetBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!booking)
      return res.status(404).json({ error: "Banquet booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteBanquetBooking = async (req, res) => {
  try {
    const booking = await BanquetBooking.findByIdAndDelete(req.params.id);
    if (!booking)
      return res.status(404).json({ error: "Banquet booking not found" });
    res.json({ message: "Banquet booking deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

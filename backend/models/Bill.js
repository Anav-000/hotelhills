const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  guest: { type: mongoose.Schema.Types.ObjectId, ref: "Guest", required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  nights: { type: Number, required: true },
  roomCharge: { type: Number, required: true },
  additionalCharges: { type: Number, default: 0 },
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bill", billSchema);

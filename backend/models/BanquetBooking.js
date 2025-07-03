const mongoose = require("mongoose");

const banquetBookingSchema = new mongoose.Schema(
  {
    banquet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Banquet",
      required: true,
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
      required: true,
    },
    eventDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["booked", "completed", "cancelled"],
      default: "booked",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BanquetBooking", banquetBookingSchema);

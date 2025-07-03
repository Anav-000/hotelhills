const mongoose = require("mongoose");

const tableBookingSchema = new mongoose.Schema(
  {
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
      required: true,
    },
    bookingTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["reserved", "completed", "cancelled"],
      default: "reserved",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TableBooking", tableBookingSchema);

const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, unique: true },
    type: { type: String, required: true }, // e.g., Single, Double, Suite
    status: {
      type: String,
      enum: ["available", "booked", "maintenance"],
      default: "available",
    },
    price: { type: Number, required: true },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);

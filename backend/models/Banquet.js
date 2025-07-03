const mongoose = require("mongoose");

const banquetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    capacity: { type: Number, required: true },
    status: {
      type: String,
      enum: ["available", "booked", "maintenance"],
      default: "available",
    },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banquet", banquetSchema);

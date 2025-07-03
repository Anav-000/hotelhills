const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    number: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true },
    status: {
      type: String,
      enum: ["available", "reserved", "occupied"],
      default: "available",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Table", tableSchema);

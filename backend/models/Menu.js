const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);

const mongoose = require("mongoose");

const kotSchema = new mongoose.Schema(
  {
    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        notes: { type: String },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "in-progress", "served"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("KOT", kotSchema);

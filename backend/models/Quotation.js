const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema(
  {
    banquetBooking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BanquetBooking",
      required: true,
    },
    amount: { type: Number, required: true },
    details: { type: String },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quotation", quotationSchema);

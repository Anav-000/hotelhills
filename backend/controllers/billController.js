const Bill = require("../models/Bill");
const Booking = require("../models/Booking");
const Room = require("../models/Room");
const Guest = require("../models/Guest");

// Generate a bill for a booking
exports.generateBill = async (req, res) => {
  try {
    const { bookingId, additionalCharges = 0 } = req.body;
    const booking = await Booking.findById(bookingId).populate("room guest");
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    const room = booking.room;
    const guest = booking.guest;
    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const roomCharge = room.price * nights;
    const total = roomCharge + Number(additionalCharges);
    const bill = new Bill({
      booking: booking._id,
      guest: guest._id,
      room: room._id,
      nights,
      roomCharge,
      additionalCharges,
      total,
    });
    await bill.save();
    res.status(201).json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get bill details by ID
exports.getBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id).populate(
      "booking guest room"
    );
    if (!bill) return res.status(404).json({ error: "Bill not found" });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

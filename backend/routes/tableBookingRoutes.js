const express = require("express");
const router = express.Router();
const tableBookingController = require("../controllers/tableBookingController");

router.get("/", tableBookingController.getAllTableBookings);
router.get("/:id", tableBookingController.getTableBookingById);
router.post("/", tableBookingController.createTableBooking);
router.put("/:id", tableBookingController.updateTableBooking);
router.delete("/:id", tableBookingController.deleteTableBooking);

module.exports = router;

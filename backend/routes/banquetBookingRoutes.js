const express = require("express");
const router = express.Router();
const banquetBookingController = require("../controllers/banquetBookingController");

router.get("/", banquetBookingController.getAllBanquetBookings);
router.get("/:id", banquetBookingController.getBanquetBookingById);
router.post("/", banquetBookingController.createBanquetBooking);
router.put("/:id", banquetBookingController.updateBanquetBooking);
router.delete("/:id", banquetBookingController.deleteBanquetBooking);

module.exports = router;

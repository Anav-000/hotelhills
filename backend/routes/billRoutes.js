const express = require("express");
const router = express.Router();
const billController = require("../controllers/billController");

router.post("/generate", billController.generateBill);
router.get("/:id", billController.getBill);

module.exports = router;

const express = require("express");
const router = express.Router();
const banquetController = require("../controllers/banquetController");

router.get("/", banquetController.getAllBanquets);
router.get("/:id", banquetController.getBanquetById);
router.post("/", banquetController.createBanquet);
router.put("/:id", banquetController.updateBanquet);
router.delete("/:id", banquetController.deleteBanquet);

module.exports = router;

const express = require("express");
const router = express.Router();
const kotController = require("../controllers/kotController");

router.get("/", kotController.getAllKOTs);
router.get("/:id", kotController.getKOTById);
router.post("/", kotController.createKOT);
router.put("/:id", kotController.updateKOT);
router.delete("/:id", kotController.deleteKOT);

module.exports = router;

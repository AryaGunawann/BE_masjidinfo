const express = require("express");
const MasjidController = require("../controllers/masjidController");

const router = express.Router();

router.post("/", MasjidController.createMasjid);
router.get("/", MasjidController.getAllMasjids);
router.get("/:id", MasjidController.getMasjidById);
router.put("/:id", MasjidController.updateMasjid);
router.delete("/:id", MasjidController.deleteMasjid);

module.exports = router;

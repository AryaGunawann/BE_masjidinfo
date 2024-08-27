const express = require("express");
const MasjidController = require("../controllers/masjidController");
const router = express.Router();

router.post("/masjids", MasjidController.create);
router.get("/masjids", MasjidController.getAll);
router.get("/masjids/:id", MasjidController.getById);
router.put("/masjids/:id", MasjidController.update);
router.delete("/masjids/:id", MasjidController.delete);

module.exports = router;

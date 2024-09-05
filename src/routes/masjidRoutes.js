const express = require("express");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const MasjidController = require("../controllers/masjidController");
const router = express.Router();

router.get("/masjids", MasjidController.getAll);
router.get("/masjids/:id", MasjidController.getById);

// Hanya admin yang bisa membuat masjid
router.post(
  "/masjids",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  MasjidController.create
);

// Hanya admin yang bisa update dan delete masjid
router.put(
  "/masjids/:id",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  MasjidController.update
);

router.delete(
  "/masjids/:id",
  authenticate,
  authorize("ADMIN"),
  MasjidController.delete
);

module.exports = router;

const express = require("express");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const MasjidController = require("../controllers/masjidController");
const router = express.Router();

// Hanya admin yang bisa membuat masjid
router.post(
  "/masjids",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  MasjidController.create
);

// Semua user bisa mendapatkan daftar masjid dan melihat detail masjid
router.get(
  "/masjids",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  MasjidController.getAll
);

router.get("/masjids/:id", MasjidController.getById);

// Hanya admin yang bisa update dan delete masjid
router.put(
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  MasjidController.update
);
router.delete(
  "/masjids/:id",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  MasjidController.delete
);

module.exports = router;

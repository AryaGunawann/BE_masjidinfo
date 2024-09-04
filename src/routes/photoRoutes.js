const express = require("express");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const PhotoController = require("../controllers/photoController");
const router = express.Router();

router.get("/photos", PhotoController.getAll);
router.get("/photos/:id", PhotoController.getById);

router.post(
  "/photos",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  PhotoController.create
);
router.put(
  "/photos/:id",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  PhotoController.update
);
router.delete(
  "/photos/:id",
  authenticate,
  authorize("ADMIN"),
  PhotoController.delete
);

module.exports = router;

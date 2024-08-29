const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const PhotoController = require("../controllers/photoController");
const router = express.Router();

router.post("/photos", authMiddleware, PhotoController.create);
router.get("/photos", PhotoController.getAll);
router.get("/photos/:id", PhotoController.getById);
router.put("/photos/:id", authMiddleware, PhotoController.update);
router.delete("/photos/:id", authMiddleware, PhotoController.delete);

module.exports = router;

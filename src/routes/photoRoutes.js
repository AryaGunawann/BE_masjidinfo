const express = require("express");

const PhotoController = require("../controllers/photoController");
const router = express.Router();

router.post("/photos", PhotoController.create);
router.get("/photos", PhotoController.getAll);
router.get("/photos/:id", PhotoController.getById);
router.put("/photos/:id", PhotoController.update);
router.delete("/photos/:id", PhotoController.delete);

module.exports = router;

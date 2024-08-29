const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const SejarahController = require("../controllers/sejarahController");

const router = express.Router();

router.post("/sejarah", authMiddleware, SejarahController.create);
router.get("/sejarah", SejarahController.getAll);
router.get("/sejarah/:id", SejarahController.getById);
router.put("/sejarah/:id", authMiddleware, SejarahController.update);
router.delete("/sejarah/:id", authMiddleware, SejarahController.delete);

module.exports = router;

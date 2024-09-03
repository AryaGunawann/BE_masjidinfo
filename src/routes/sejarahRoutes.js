const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const SejarahController = require("../controllers/sejarahController");

const router = express.Router();

router.post("/sejarah", SejarahController.create);
router.get("/sejarah", SejarahController.getAll);
router.get("/sejarah/:id", SejarahController.getById);
router.put("/sejarah/:id", SejarahController.update);
router.delete("/sejarah/:id", SejarahController.delete);

module.exports = router;

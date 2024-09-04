const express = require("express");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const SejarahController = require("../controllers/sejarahController");

const router = express.Router();

router.get("/sejarah", SejarahController.getAll);
router.get("/sejarah/:id", SejarahController.getById);

router.post(
  "/sejarah",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  SejarahController.create
);

router.put(
  "/sejarah/:id",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  SejarahController.update
);

router.delete(
  "/sejarah/:id",
  authenticate,
  authorize(["ADMIN"]),
  SejarahController.delete
);

module.exports = router;

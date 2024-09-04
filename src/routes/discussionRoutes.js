const express = require("express");
const DiscussionController = require("../controllers/discussionController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/discussions", DiscussionController.getAll);
router.get("/discussions/:id", DiscussionController.getById);

router.post(
  "/discussions",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  DiscussionController.create
);

router.put(
  "/discussions/:id",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  DiscussionController.update
);

router.delete(
  "/discussions/:id",
  authenticate,
  authorize("ADMIN"),
  DiscussionController.delete
);

module.exports = router;

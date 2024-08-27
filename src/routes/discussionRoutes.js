const express = require("express");
const DiscussionController = require("../controllers/discussionController");
const router = express.Router();

router.post("/discussions", DiscussionController.create);
router.get("/discussions", DiscussionController.getAll);
router.get("/discussions/:id", DiscussionController.getById);
router.put("/discussions/:id", DiscussionController.update);
router.delete("/discussions/:id", DiscussionController.delete);

module.exports = router;

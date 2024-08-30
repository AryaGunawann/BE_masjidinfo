const express = require("express");
const DiscussionController = require("../controllers/discussionController");
const authmiddleware = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/discussions", authmiddleware, DiscussionController.create);
router.get("/discussions", authmiddleware, DiscussionController.getAll);
router.get("/discussions/:id", authmiddleware, DiscussionController.getById);
router.put("/discussions/:id", authmiddleware, DiscussionController.update);
router.delete("/discussions/:id", authmiddleware, DiscussionController.delete);

module.exports = router;

const express = require("express");
const router = express.Router();
const postsController = require("../controller/posts.controller");

// Menghubungkan endpoint dengan fungsi-fungsi di postsController
router.get("/posts", postsController.getAll);
router.get("/posts/:id", postsController.getById);
router.post("/posts", postsController.create);
router.put("/posts/:id", postsController.update);
router.delete("/posts/:id", postsController.delete);

module.exports = router;

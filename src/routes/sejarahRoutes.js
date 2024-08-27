const express = require("express");
const SejarahController = require("../controllers/sejarahController");

const router = express.Router();

router.post("/", SejarahController.create);
router.get("/", SejarahController.getAll);
router.get("/:id", SejarahController.getById);
router.put("/:id", SejarahController.update);
router.delete("/:id", SejarahController.delete);

module.exports = router;

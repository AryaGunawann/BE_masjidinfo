const express = require("express");
const HistoryController = require("../controllers/historyController");
const router = express.Router();

router.post("/histories", HistoryController.create);
router.get("/histories", HistoryController.getAll);
router.get("/histories/:id", HistoryController.getById);
router.put("/histories/:id", HistoryController.update);
router.delete("/histories/:id", HistoryController.delete);

module.exports = router;

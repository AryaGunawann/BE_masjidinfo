const express = require("express");
const CategoryController = require("../controllers/categoryController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/categories", authMiddleware, CategoryController.create);
router.get("/categories", CategoryController.getAll);
router.get("/categories/:id", CategoryController.getById);
router.put("/categories/:id", authMiddleware, CategoryController.update);
router.delete("/categories/:id", authMiddleware, CategoryController.delete);

module.exports = router;

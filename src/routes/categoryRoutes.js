const express = require("express");
const CategoryController = require("../controllers/categoryController");
const authmiddleware = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/categories", authmiddleware, CategoryController.create);
router.get("/categories", CategoryController.getAll);
router.get("/categories/:id", CategoryController.getById);
router.put("/categories/:id", authmiddleware, CategoryController.update);
router.delete("/categories/:id", authmiddleware, CategoryController.delete);

module.exports = router;

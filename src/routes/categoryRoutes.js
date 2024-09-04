const express = require("express");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const CategoryController = require("../controllers/categoryController");

const router = express.Router();

router.get("/categories", CategoryController.getAll);
router.get("/categories/:id", CategoryController.getById);

router.post(
  "/categories",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  CategoryController.create
);

router.put(
  "/categories/:id",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  CategoryController.update
);

router.delete(
  "/categories/:id",
  authenticate,
  authorize("ADMIN"),
  CategoryController.delete
);

module.exports = router;

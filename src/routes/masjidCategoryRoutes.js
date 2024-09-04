const express = require("express");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const MasjidCategoriesController = require("../controllers/MasjidCategoryController");

const router = express.Router();

router.get(
  "/masjidcategories",
  MasjidCategoriesController.getAllMasjidCategories
);
router.get(
  "/masjidcategories/:id",
  MasjidCategoriesController.getMasjidCategoryById
);

router.post(
  "/masjidcategories",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  MasjidCategoriesController.createMasjidCategory
);

router.put(
  "/masjidcategories/:id",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  MasjidCategoriesController.updateMasjidCategory
);

router.delete(
  "/masjidcategories/:id",
  authenticate,
  authorize("ADMIN"),
  MasjidCategoriesController.deleteMasjidCategory
);

module.exports = router;

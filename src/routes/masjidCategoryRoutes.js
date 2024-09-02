const express = require("express");
const MasjidCategoriesController = require("../controllers/MasjidCategoryController");

const router = express.Router();

router.post(
  "/masjidcategories",
  MasjidCategoriesController.createMasjidCategory
);
router.get(
  "/masjidcategories",
  MasjidCategoriesController.getAllMasjidCategories
);
router.get(
  "/masjidcategories/:id",
  MasjidCategoriesController.getMasjidCategoryById
);
router.put(
  "/masjidcategories/:id",
  MasjidCategoriesController.updateMasjidCategory
);
router.delete(
  "/masjidcategories/:id",
  MasjidCategoriesController.deleteMasjidCategory
);

module.exports = router;

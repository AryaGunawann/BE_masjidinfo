const MasjidCategoryService = require("../services/MasjidCategoryService.js");

class MasjidCategoriesController {
  static async getAllMasjidCategories(req, res) {
    try {
      const categories = await MasjidCategoryService.getAllMasjidCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getMasjidCategoryById(req, res) {
    try {
      const category = await MasjidCategoryService.getMasjidCategoryById(
        req.params.id
      );
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createMasjidCategory(req, res) {
    const userId = req.user.id;
    try {
      if (req.user.role !== "AUTHOR" && req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Access denied" });
      }

      if (!req.body.masjidId || !req.body.categoryId) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const category = await MasjidCategoryService.createMasjidCategory({
        masjidId: req.body.masjidId,
        categoryId: req.body.categoryId,
        created_by: userId,
        updated_by: userId,
      });

      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateMasjidCategory(req, res) {
    try {
      const category = await MasjidCategoryService.updateMasjidCategory(
        req.params.id,
        req.body
      );
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteMasjidCategory(req, res) {
    const user = req.user;
    if (user.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden" });
    }
    try {
      const category = await MasjidCategoryService.deleteMasjidCategory(
        req.params.id
      );
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = MasjidCategoriesController;

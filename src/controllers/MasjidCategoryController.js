const MasjidCategoryService = require("../services/MasjidCategoryService.js");

class MasjidCategoriesController {
  static async createMasjidCategory(req, res) {
    try {
      const category = await MasjidCategoryService.createMasjidCategory(
        req.body
      );
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

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
    try {
      await MasjidCategoryService.deleteMasjidCategory(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = MasjidCategoriesController;

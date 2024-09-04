const MasjidCategoryService = require("../services/MasjidCategoryService.js");

class MasjidCategoriesController {
  // Semua pengguna dapat melihat semua kategori
  static async getAllMasjidCategories(req, res) {
    try {
      const categories = await MasjidCategoryService.getAllMasjidCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Semua pengguna dapat melihat kategori berdasarkan ID
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

  // Hanya author dan admin yang dapat membuat kategori baru
  static async createMasjidCategory(req, res) {
    const user = req.user;
    if (user.role !== "AUTHOR" && user.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden" });
    }
    try {
      const category = await MasjidCategoryService.createMasjidCategory(
        req.body
      );
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Hanya admin yang dapat mengedit kategori
  static async updateMasjidCategory(req, res) {
    const user = req.user;
    if (user.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden" });
    }
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

  // Hanya admin yang dapat menghapus kategori
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

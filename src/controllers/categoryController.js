const CategoryService = require("../services/categoryService");

class CategoryController {
  // Semua pengguna dapat melihat semua kategori
  static async getAll(req, res) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Semua pengguna dapat melihat kategori berdasarkan ID
  static async getById(req, res) {
    try {
      const category = await CategoryService.getCategoryById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Hanya author dan admin yang dapat membuat kategori baru
  static async create(req, res) {
    if (req.user.role !== "AUTHOR" && req.user.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }
    const userId = req.user.id;
    try {
      const category = await CategoryService.createCategory(req.body, userId);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Hanya admin yang dapat mengedit kategori
  static async update(req, res) {
    const user = req.user;
    if (user.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden" });
    }
    try {
      const category = await CategoryService.updateCategory(
        req.params.id,
        req.body
      );
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Hanya admin yang dapat menghapus kategori
  static async delete(req, res) {
    const user = req.user;
    if (user.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden" });
    }
    try {
      const category = await CategoryService.deleteCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = CategoryController;

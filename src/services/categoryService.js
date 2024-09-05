const CategoryModel = require("../models/categoryModel");

class CategoryService {
  static async createCategory(data, userId) {
    return await CategoryModel.create({
      ...data,
      created_by: userId,
      updated_by: userId,
    });
  }

  static async getAllCategories() {
    return await CategoryModel.findAll();
  }

  static async getCategoryById(id) {
    return await CategoryModel.findById(id);
  }

  static async updateCategory(id, data) {
    return await CategoryModel.update(id, data);
  }

  static async deleteCategory(id) {
    return await CategoryModel.delete(id);
  }
}

module.exports = CategoryService;

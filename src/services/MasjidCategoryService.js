const MasjidCategoryModel = require("../models/MasjidCategoryModel.js");

class MasjidCategoriesService {
  static async createMasjidCategory(data) {
    return await MasjidCategoryModel.create(data);
  }

  static async getAllMasjidCategories() {
    return await MasjidCategoryModel.findAll();
  }

  static async getMasjidCategoryById(id) {
    return await MasjidCategoryModel.findById(id);
  }

  static async updateMasjidCategory(id, data) {
    return await MasjidCategoryModel.update(id, data);
  }

  static async deleteMasjidCategory(id) {
    return await MasjidCategoryModel.delete(id);
  }
}

module.exports = MasjidCategoriesService;

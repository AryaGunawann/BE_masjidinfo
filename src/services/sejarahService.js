const SejarahModel = require("../models/sejarahModel");

class SejarahService {
  static async createSejarah(data, userId) {
    return await SejarahModel.create({
      ...data,
      created_by: userId,
      updated_by: userId,
    });
  }

  static async getAllSejarah() {
    return await SejarahModel.findAll();
  }

  static async getSejarahById(id) {
    return await SejarahModel.findById(id);
  }

  static async updateSejarah(id, data) {
    return await SejarahModel.update(id, data);
  }

  static async deleteSejarah(id) {
    return await SejarahModel.delete(id);
  }
}

module.exports = SejarahService;

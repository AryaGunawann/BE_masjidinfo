const SejarahModel = require("../models/SejarahModel");

class SejarahService {
  static async createSejarah(data) {
    return await SejarahModel.create(data);
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

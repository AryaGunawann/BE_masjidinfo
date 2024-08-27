const MasjidModel = require("../models/masjidModel");

class MasjidService {
  static async createMasjid(data) {
    return await MasjidModel.create(data);
  }

  static async getAllMasjids() {
    return await MasjidModel.findAll();
  }

  static async getMasjidById(id) {
    return await MasjidModel.findById(id);
  }

  static async updateMasjid(id, data) {
    return await MasjidModel.update(id, data);
  }

  static async deleteMasjid(id) {
    return await MasjidModel.delete(id);
  }
}

module.exports = MasjidService;

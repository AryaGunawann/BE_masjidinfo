const MasjidModel = require("../models/masjidModel");

class MasjidService {
  static async createMasjid(data, userId) {
    return await MasjidModel.create({
      ...data,
      created_by: userId,
      updated_by: userId,
    });
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

const DetailMasjidModel = require("../models/detailMasjidModel");

class DetailMasjidService {
  static async createDetailMasjid(data, userId) {
    return await DetailMasjidModel.create({
      ...data,
      created_by: userId,
      updated_by: userId,
    });
  }

  static async getAllDetailMasjids() {
    return await DetailMasjidModel.findAll();
  }

  static async getDetailMasjidById(id) {
    await DetailMasjidModel.incrementTotalKlik(id);
    return await DetailMasjidModel.findById(id);
  }

  static async updateDetailMasjid(id, data) {
    return await DetailMasjidModel.update(id, data);
  }

  static async deleteDetailMasjid(id) {
    return await DetailMasjidModel.delete(id);
  }

  static async getDetailMasjidByName(name) {
    return await DetailMasjidModel.findByName(name);
  }
}

module.exports = DetailMasjidService;

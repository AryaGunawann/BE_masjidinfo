const DetailMasjidModel = require("../models/detailMasjidModel");

class DetailMasjidService {
  static async createDetailMasjid(data) {
    return await DetailMasjidModel.create(data);
  }

  static async getAllDetailMasjids() {
    return await DetailMasjidModel.findAll();
  }

  static async getDetailMasjidById(id) {
    return await DetailMasjidModel.findById(id);
  }

  static async updateDetailMasjid(id, data) {
    return await DetailMasjidModel.update(id, data);
  }

  static async deleteDetailMasjid(id) {
    return await DetailMasjidModel.delete(id);
  }
}

module.exports = DetailMasjidService;

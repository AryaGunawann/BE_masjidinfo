const DetailMasjidModel = require("../models/detailMasjidModel");

class DetailMasjidService {
  static async createDetailMasjid(data, userId) {
    // Buat slug dari title
    const slug = data.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");

    return await DetailMasjidModel.create({
      ...data,
      slug, // Menyertakan slug di data yang akan disimpan
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

  static async getDetailMasjidBySlug(slug) {
    return await DetailMasjidModel.findBySlug(slug);
  }
}

module.exports = DetailMasjidService;

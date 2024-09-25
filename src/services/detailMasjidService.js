const DetailMasjidModel = require("../models/detailMasjidModel");

class DetailMasjidService {
  static async createDetailMasjid(data, userId) {
    // Buat slug dari name
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

  static async getDetailMasjidBySlug(slug) {
    return await DetailMasjidModel.findBySlug(slug);
  }

  static async getDetailMasjidBySlug(slug) {
    await DetailMasjidModel.incrementTotalKlik(slug);
    return await DetailMasjidModel.findBySlug(slug);
  }

  static async updateDetailMasjid(id, data) {
    return await DetailMasjidModel.update(id, data);
  }

  static async deleteDetailMasjid(id) {
    return await DetailMasjidModel.delete(id);
  }
}

module.exports = DetailMasjidService;

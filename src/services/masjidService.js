const MasjidModel = require("../models/masjidModel");

class MasjidService {
  static async createMasjid(data) {
    try {
      return await MasjidModel.create(data);
    } catch (error) {
      throw new Error("Failed to create masjid: " + error.message);
    }
  }

  static async findAllMasjids() {
    try {
      return await MasjidModel.findAll();
    } catch (error) {
      throw new Error("Failed to retrieve masjids: " + error.message);
    }
  }

  static async findMasjidById(id) {
    try {
      return await MasjidModel.findById(id);
    } catch (error) {
      throw new Error("Failed to retrieve masjid by ID: " + error.message);
    }
  }

  static async updateMasjid(id, data) {
    try {
      return await MasjidModel.update(id, data);
    } catch (error) {
      throw new Error("Failed to update masjid: " + error.message);
    }
  }

  static async deleteMasjid(id) {
    try {
      return await MasjidModel.delete(id);
    } catch (error) {
      throw new Error("Failed to delete masjid: " + error.message);
    }
  }
}

module.exports = MasjidService;

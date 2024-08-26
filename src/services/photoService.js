const PhotoModel = require("../models/photoModel");

class PhotoService {
  static async createPhoto(data) {
    return await PhotoModel.create(data);
  }

  static async getAllPhotos() {
    return await PhotoModel.findAll();
  }

  static async getPhotoById(id) {
    return await PhotoModel.findById(id);
  }

  static async updatePhoto(id, data) {
    return await PhotoModel.update(id, data);
  }

  static async deletePhoto(id) {
    return await PhotoModel.delete(id);
  }
}

module.exports = PhotoService;

const prisma = require("../config/dbConfig");

class PhotoModel {
  static async create(data) {
    return await prisma.photo.create({ data });
  }

  static async findAll() {
    return await prisma.photo.findMany();
  }

  static async findById(id) {
    return await prisma.photo.findUnique({ where: { id: parseInt(id, 10) } });
  }

  static async update(id, data) {
    return await prisma.photo.update({ where: { id: parseInt(id, 10) }, data });
  }

  static async delete(id) {
    return await prisma.photo.delete({ where: { id: parseInt(id, 10) } });
  }
}

module.exports = PhotoModel;

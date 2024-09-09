const prisma = require("../config/dbConfig");

class SejarahModel {
  static async create(data) {
    return await prisma.sejarah.create({ data });
  }

  static async findAll() {
    return await prisma.sejarah.findMany();
  }

  static async findById(id) {
    // Konversi id ke Int sebelum digunakan
    return await prisma.sejarah.findUnique({
      where: { id: parseInt(id, 10) },
    });
  }

  static async update(id, data) {
    // Konversi id ke Int sebelum digunakan
    return await prisma.sejarah.update({
      where: { id: parseInt(id, 10) },
      data,
    });
  }

  static async delete(id) {
    // Konversi id ke Int sebelum digunakan
    return await prisma.sejarah.delete({
      where: { id: parseInt(id, 10) },
    });
  }
}

module.exports = SejarahModel;

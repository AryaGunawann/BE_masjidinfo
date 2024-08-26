const prisma = require("../config/dbConfig");

class MasjidModel {
  static async create(data) {
    return await prisma.masjid.create({ data });
  }

  static async findAll() {
    return await prisma.masjid.findMany();
  }

  static async findById(id) {
    return await prisma.masjid.findUnique({ where: { id } });
  }

  static async update(id, data) {
    return await prisma.masjid.update({ where: { id }, data });
  }

  static async delete(id) {
    return await prisma.masjid.delete({ where: { id } });
  }
}

module.exports = MasjidModel;

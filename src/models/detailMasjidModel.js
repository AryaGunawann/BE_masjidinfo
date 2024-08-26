const prisma = require("../config/dbConfig");

class DetailMasjidModel {
  static async create(data) {
    return await prisma.detailMasjid.create({ data });
  }

  static async findAll() {
    return await prisma.detailMasjid.findMany();
  }

  static async findById(id) {
    return await prisma.detailMasjid.findUnique({ where: { id } });
  }

  static async update(id, data) {
    return await prisma.detailMasjid.update({ where: { id }, data });
  }

  static async delete(id) {
    return await prisma.detailMasjid.delete({ where: { id } });
  }
}

module.exports = DetailMasjidModel;

const prisma = require("../config/dbConfig");

class SejarahModel {
  static async create(data) {
    return await prisma.sejarah.create({ data });
  }

  static async findAll() {
    return await prisma.sejarah.findMany();
  }

  static async findById(id) {
    return await prisma.sejarah.findUnique({ where: { id } });
  }

  static async update(id, data) {
    return await prisma.sejarah.update({ where: { id }, data });
  }

  static async delete(id) {
    return await prisma.sejarah.delete({ where: { id } });
  }
}

module.exports = SejarahModel;

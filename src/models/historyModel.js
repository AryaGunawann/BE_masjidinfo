const prisma = require("../config/dbConfig");

class HistoryModel {
  static async create(data) {
    return await prisma.history.create({ data });
  }

  static async findAll() {
    return await prisma.history.findMany();
  }

  static async findById(id) {
    return await prisma.history.findUnique({ where: { id } });
  }

  static async update(id, data) {
    return await prisma.history.update({ where: { id }, data });
  }

  static async delete(id) {
    return await prisma.history.delete({ where: { id } });
  }
}

module.exports = HistoryModel;

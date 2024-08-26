const prisma = require("../config/dbConfig");

class CategoryModel {
  static async create(data) {
    return await prisma.category.create({ data });
  }

  static async findAll() {
    return await prisma.category.findMany();
  }

  static async findById(id) {
    return await prisma.category.findUnique({ where: { id } });
  }

  static async update(id, data) {
    return await prisma.category.update({ where: { id }, data });
  }

  static async delete(id) {
    return await prisma.category.delete({ where: { id } });
  }
}

module.exports = CategoryModel;

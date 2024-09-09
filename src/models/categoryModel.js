const prisma = require("../config/dbConfig");

class CategoryModel {
  static async create(data) {
    return await prisma.category.create({ data });
  }

  static async findAll() {
    return await prisma.category.findMany();
  }

  static async findById(id) {
    return await prisma.category.findUnique({
      where: { id: parseInt(id, 10) },
    });
  }

  static async update(id, data) {
    return await prisma.category.update({
      where: { id: parseInt(id, 10) },
      data,
    });
  }

  static async delete(id) {
    return await prisma.category.delete({ where: { id: parseInt(id, 10) } });
  }
}

module.exports = CategoryModel;

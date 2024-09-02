const prisma = require("../config/dbConfig");

class MasjidCategoryModel {
  static async create(data) {
    return await prisma.masjidCategory.create({
      data,
      include: {
        masjid: true,
        category: true,
      },
    });
  }

  static async findAll() {
    return await prisma.masjidCategory.findMany({
      include: {
        masjid: true,
        category: true,
      },
    });
  }

  static async findById(id) {
    return await prisma.masjidCategory.findUnique({
      where: { id: Number(id) },
      include: {
        masjid: true,
        category: true,
      },
    });
  }

  static async update(id, data) {
    return await prisma.masjidCategory.update({
      where: { id: Number(id) },
      data,
      include: {
        masjid: true,
        category: true,
      },
    });
  }

  static async delete(id) {
    return await prisma.masjidCategory.delete({
      where: { id: Number(id) },
    });
  }
}

module.exports = MasjidCategoryModel;

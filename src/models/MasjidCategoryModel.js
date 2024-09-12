const prisma = require("../config/dbConfig");

class MasjidCategoryModel {
  static async create(data) {
    if (
      !data.masjidId ||
      !data.categoryId ||
      !data.created_by ||
      !data.updated_by
    ) {
      throw new Error("Missing required fields");
    }

    return await prisma.masjidCategory.create({
      data: {
        masjid: {
          connect: { id: data.masjidId },
        },
        category: {
          connect: { id: data.categoryId },
        },
        createdBy: {
          connect: { id: data.created_by },
        },
        updatedBy: {
          connect: { id: data.updated_by },
        },
      },
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

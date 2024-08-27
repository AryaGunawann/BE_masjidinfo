const prisma = require("../config/dbConfig");

class MasjidModel {
  static async create(data) {
    return await prisma.masjid.create({
      data,
      include: {
        detailMasjids: true,
        categories: true,
      },
    });
  }

  static async findAll() {
    return await prisma.masjid.findMany({
      include: {
        detailMasjids: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  static async findById(id) {
    return await prisma.masjid.findUnique({
      where: { id },
      include: {
        detailMasjids: {
          include: {
            photos: true,
            sejarah: true,
            discussions: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  static async update(id, data) {
    return await prisma.masjid.update({
      where: { id },
      data,
      include: {
        detailMasjids: true,
        categories: true,
      },
    });
  }

  static async delete(id) {
    return await prisma.masjid.delete({
      where: { id },
    });
  }
}

module.exports = MasjidModel;

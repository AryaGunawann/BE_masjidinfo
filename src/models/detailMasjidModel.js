const prisma = require("../config/dbConfig");

class DetailMasjidModel {
  static async create(data) {
    return await prisma.detailMasjid.create({
      data,
      include: {
        photos: true,
        sejarah: true,
        discussions: true,
      },
    });
  }

  static async findAll() {
    return await prisma.detailMasjid.findMany({
      include: {
        photos: true,
        sejarah: true,
        discussions: true,
      },
    });
  }

  static async findById(id) {
    return await prisma.detailMasjid.findUnique({
      where: { id },
      include: {
        photos: true,
        sejarah: true,
        discussions: true,
      },
    });
  }

  static async findBySlug(slug) {
    return await prisma.detailMasjid.findUnique({
      where: { slug },
      include: {
        photos: true,
        sejarah: true,
        discussions: true,
      },
    });
  }

  static async update(id, data) {
    return await prisma.detailMasjid.update({
      where: { id },
      data,
      include: {
        photos: true,
        sejarah: true,
        discussions: true,
      },
    });
  }

  static async delete(id) {
    return await prisma.detailMasjid.delete({
      where: { id },
    });
  }

  static async incrementTotalKlik(id) {
    return await prisma.detailMasjid.update({
      where: { id },
      data: { total_klik: { increment: 1 } },
    });
  }
}

module.exports = DetailMasjidModel;

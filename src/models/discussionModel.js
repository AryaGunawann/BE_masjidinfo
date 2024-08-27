const prisma = require("../config/dbConfig");

class DiscussionModel {
  static async create(data) {
    return await prisma.discussion.create({ data });
  }

  static async findAll() {
    return await prisma.discussion.findMany({
      include: {
        user: true,
        replies: true,
      },
    });
  }

  static async findById(id) {
    return await prisma.discussion.findUnique({
      where: { id },
      include: {
        user: true,
        replies: true,
      },
    });
  }

  static async update(id, data) {
    return await prisma.discussion.update({
      where: { id },
      data,
    });
  }

  static async delete(id) {
    return await prisma.discussion.delete({ where: { id } });
  }
}

module.exports = DiscussionModel;

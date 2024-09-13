const prisma = require("../config/dbConfig");

class DiscussionModel {
  static async create(data) {
    return await prisma.discussion.create({
      data: {
        message: data.message,
        id_replies_discussion: data.id_replies_discussion || null,
        id_user: data.id_user,
        id_detail_masjid: data.id_detail_masjid,
      },
    });
  }

  static async findAll() {
    return await prisma.discussion.findMany({
      include: {
        user: {
          select: {
            name: true, // Only fetch the user's name
            avatar: true, // Only fetch the user's avatar
          },
        },
        replies: {
          select: {
            message: true, // Fetch replies' messages
            user: {
              select: {
                name: true, // Fetch the reply user's name
                avatar: true, // Fetch the reply user's avatar
              },
            },
          },
        },
      },
    });
  }

  static async findById(id) {
    return await prisma.discussion.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true, // Fetch user's name
            avatar: true, // Fetch user's avatar
          },
        },
        replies: {
          select: {
            message: true, // Fetch replies' messages
            user: {
              select: {
                name: true, // Fetch reply user's name
                avatar: true, // Fetch reply user's avatar
              },
            },
          },
        },
      },
    });
  }

  static async update(id, data) {
    return await prisma.discussion.update({
      where: { id },
      data: {
        message: data.message,
        id_replies_discussion: data.id_replies_discussion,
        id_user: data.id_user,
        id_detail_masjid: data.id_detail_masjid,
      },
    });
  }

  static async delete(id) {
    return await prisma.discussion.delete({
      where: { id },
    });
  }
}

module.exports = DiscussionModel;

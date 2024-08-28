const prisma = require("../config/dbConfig");

class UserModel {
  static async create(data) {
    return await prisma.user.create({
      data: {
        ...data,
        role: data.role || "USER", // Default to USER if no role is specified
      },
    });
  }

  static async findById(id) {
    return await prisma.user.findUnique({ where: { id } });
  }

  static async findByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
  }

  static async update(id, data) {
    return await prisma.user.update({ where: { id }, data });
  }

  static async delete(id) {
    return await prisma.user.delete({ where: { id } });
  }

  static async updateVerificationToken(id, token) {
    return await prisma.user.update({
      where: { id },
      data: {
        reset_password_token: token,
        is_email_verification: false,
      },
    });
  }

  static async verifyUser(token) {
    return await prisma.user.updateMany({
      where: {
        reset_password_token: token,
        is_verified: false,
      },
      data: {
        is_verified: true,
        is_email_verification: true,
        reset_password_token: null,
      },
    });
  }

  static async updatePasswordResetToken(id, token, expiration) {
    return await prisma.user.update({
      where: { id },
      data: {
        reset_password_token: token,
        reset_password_expiration: expiration,
      },
    });
  }

  static async findByResetToken(token) {
    return await prisma.user.findFirst({
      where: {
        reset_password_token: token,
        reset_password_expiration: { gte: new Date() },
      },
    });
  }

  static async updatePassword(id, newPassword) {
    return await prisma.user.update({
      where: { id },
      data: {
        password: newPassword,
        reset_password_token: null,
        reset_password_expiration: null,
      },
    });
  }
}

module.exports = UserModel;

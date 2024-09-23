const prisma = require("../config/dbConfig");

class UserModel {
  static async create(data) {
    return await prisma.user.create({
      data: {
        ...data,
        role: data.role || "USER",
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        is_verified: true,
        is_email_verification: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  static async findById(id) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        is_verified: true,
        is_email_verification: true,
        role: true,
        created_at: true,
        updated_at: true,
        otp_hash: true,
        otp_expiration: true,
      },
    });
  }

  static async findByEmail(email) {
    return await prisma.user.findUnique({ where: { email } });
  }

  static async update(id, data) {
    return await prisma.user.update({ where: { id }, data });
  }

  static async updateOTP(id, otpHash, otpExpiration) {
    return await prisma.user.update({
      where: { id },
      data: {
        otp_hash: otpHash,
        otp_expiration: otpExpiration,
        otp_attempts: 0,
        otp_last_attempt: null,
      },
    });
  }

  static async incrementOTPAttempts(id) {
    return await prisma.user.update({
      where: { id },
      data: {
        otp_attempts: { increment: 1 },
        otp_last_attempt: new Date(),
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

  static async findAll() {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        is_verified: true,
        is_email_verification: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  static async delete(id) {
    return await prisma.user.delete({ where: { id } });
  }

  static async verifyUser(token) {
    return await prisma.user.updateMany({
      where: {
        reset_password_token: token,
        reset_password_expiration: { gte: new Date() },
      },
      data: {
        is_email_verification: true,
        reset_password_token: null,
        reset_password_expiration: null,
      },
    });
  }
}

module.exports = UserModel;

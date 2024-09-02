const bcrypt = require("bcrypt");
const crypto = require("crypto");
const UserModel = require("../models/userModel");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

class UserService {
  static async register(data) {
    const existingUser = await UserModel.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email is already in use");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await UserModel.create({ ...data, password: hashedPassword });

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    await UserModel.updateVerificationToken(user.id, verificationToken);

    // Send verification email
    const verificationUrl = `http://localhost:${process.env.PORT}/api/auth/verify/${verificationToken}`;
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: "Verify Your Email",
      text: `Please verify your email by clicking the following link: ${verificationUrl}`,
    };
    await transporter.sendMail(mailOptions);

    return user;
  }

  static async login(email, password) {
    const user = await UserModel.findByEmail(email);
    if (!user) throw new Error("Invalid email or password");
    if (!user.is_verified)
      throw new Error("Please verify your email before logging in");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    return user;
  }

  static async generatePasswordResetToken(email) {
    const user = await UserModel.findByEmail(email);
    if (!user) throw new Error("User not found");

    const token = crypto.randomBytes(20).toString("hex");
    const expiration = new Date(Date.now() + 3600000); // 1 hour

    await UserModel.updatePasswordResetToken(user.id, token, expiration);

    // Send password reset email
    const resetUrl = `http://localhost:${process.env.PORT}/api/auth/reset-password/${token}`;
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: "Password Reset",
      text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
    };
    await transporter.sendMail(mailOptions);

    return { token, expiration };
  }

  static async resetPassword(token, newPassword) {
    const user = await UserModel.findByResetToken(token);
    if (!user) throw new Error("Invalid or expired password reset token");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UserModel.updatePassword(user.id, hashedPassword);
  }

  static async verifyEmail(token) {
    const result = await UserModel.verifyUser(token);
    if (!result.count) throw new Error("Invalid or expired verification token");
  }

  static async updateUser(id, data) {
    return await UserModel.update(id, data);
  }

  static async deleteUser(id) {
    return await UserModel.delete(id);
  }

  static async getAllUsers() {
    return await UserModel.findAll();
  }
}

module.exports = UserService;

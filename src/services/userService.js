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
  static generateNumericOTP(length = 6) {
    return crypto
      .randomInt(Math.pow(10, length - 1), Math.pow(10, length) - 1)
      .toString();
  }

  static async register(data) {
    const existingUser = await UserModel.findByEmail(data.email);
    if (existingUser) {
      throw new Error("Email is already in use");
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await UserModel.create({ ...data, password: hashedPassword });

    // Generate OTP (One-Time Password)
    const otp = this.generateNumericOTP();
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
    const otpHash = await bcrypt.hash(otp, 10);

    // Simpan hash OTP dan masa berlaku di database
    await UserModel.updateOTP(user.id, otpHash, otpExpiration);

    // Cek apakah OTP tersimpan dengan baik
    console.log("OTP Hash:", otpHash);
    console.log("OTP Expiration:", otpExpiration);

    // Kirim OTP ke email pengguna
    await this.sendOTPByEmail(user.email, otp);

    return user;
  }

  static async login(email, password) {
    const user = await UserModel.findByEmail(email);
    if (!user) throw new Error("Invalid email or password");
    if (!user.is_email_verification) {
      throw new Error("Please verify your email before logging in");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    return user;
  }

  static async verifyOTP(userId, otp) {
    const user = await UserModel.findById(userId);
    if (!user) {
      console.log("Pengguna tidak ditemukan");
      throw new Error("Pengguna tidak ditemukan");
    }

    console.log("User ditemukan:", user);
    console.log("OTP Hash:", user.otp_hash);
    console.log("OTP Expiration:", user.otp_expiration);

    if (!user.otp_hash || user.otp_expiration < new Date()) {
      console.log("OTP tidak valid atau telah kedaluwarsa");
      throw new Error("OTP tidak valid atau telah kedaluwarsa");
    }

    // Cek jumlah percobaan maksimum
    if (
      user.otp_attempts >= 3 &&
      user.otp_last_attempt > new Date(Date.now() - 30 * 60 * 1000)
    ) {
      console.log("Terlalu banyak percobaan.");
      throw new Error("Terlalu banyak percobaan. Silakan coba lagi nanti.");
    }

    // Bandingkan OTP
    const isMatch = await bcrypt.compare(otp.trim(), user.otp_hash);

    console.log("Hasil banding OTP:", isMatch);

    if (!isMatch) {
      await UserModel.incrementOTPAttempts(user.id);
      console.log("OTP tidak valid");
      throw new Error("OTP tidak valid");
    }

    // Perbarui status verifikasi pengguna
    await UserModel.update(user.id, {
      is_email_verification: true,
      otp_hash: null,
      otp_expiration: null,
      otp_attempts: 0,
      otp_last_attempt: null,
    });

    console.log("OTP verifikasi berhasil untuk pengguna:", user.id);
    return user;
  }

  static async regenerateOTP(userId) {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const otp = this.generateNumericOTP();
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000);
    const otpHash = await bcrypt.hash(otp, 10);

    await UserModel.updateOTP(user.id, otpHash, otpExpiration);

    await this.sendOTPByEmail(user.email, otp);

    return { message: "New OTP has been sent to your email" };
  }

  static async sendOTPByEmail(email, otp) {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your verification code is: ${otp}. This code is valid for 10 minutes.`,
    };
    await transporter.sendMail(mailOptions);
  }

  static async verifyEmail(token) {
    const result = await UserModel.verifyUser(token);
    if (!result.count) throw new Error("Invalid or expired verification token");
  }

  static async requestPasswordReset(email) {
    const user = await UserModel.findByEmail(email);
    if (!user) throw new Error("Pengguna tidak ditemukan");

    // Generate OTP
    const otp = this.generateNumericOTP();
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // Berlaku 10 menit
    const otpHash = await bcrypt.hash(otp, 10);

    // Simpan hash OTP dan masa berlakunya
    await UserModel.updateOTP(user.id, otpHash, otpExpiration);

    // Kirim OTP ke email pengguna
    await this.sendPasswordResetOTPByEmail(user.email, otp);

    return { message: "OTP reset password telah dikirim ke email Anda" };
  }

  static async sendPasswordResetOTPByEmail(email, otp) {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Reset Password OTP",
      text: `Kode OTP reset password Anda adalah: ${otp}. Kode ini berlaku selama 10 menit.`,
    };
    await transporter.sendMail(mailOptions);
  }

  static async resetPasswordWithOTP(email, otp, newPassword) {
    const user = await UserModel.findByEmail(email);
    if (!user) throw new Error("Pengguna tidak ditemukan");

    // Periksa apakah OTP valid
    if (!user.otp_hash || user.otp_expiration < new Date()) {
      throw new Error("OTP tidak valid atau telah kedaluwarsa");
    }

    // Bandingkan OTP
    const isMatch = await bcrypt.compare(otp.trim(), user.otp_hash);
    if (!isMatch) {
      await UserModel.incrementOTPAttempts(user.id);
      throw new Error("OTP tidak valid");
    }

    // Hash password baru
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Perbarui password dan reset data OTP
    await UserModel.update(user.id, {
      password: hashedPassword,
      otp_hash: null,
      otp_expiration: null,
      otp_attempts: 0,
      otp_last_attempt: null,
    });

    return { message: "Password berhasil direset" };
  }

  static async updateUser(id, data) {
    return await UserModel.update(id, data);
  }

  static async deleteUser(id) {
    return await UserModel.delete(id);
  }

  static async getUserById(id) {
    return await UserModel.findById(id);
  }

  static async getAllUsers() {
    return await UserModel.findAll();
  }
}

module.exports = UserService;

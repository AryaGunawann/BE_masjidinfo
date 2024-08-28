const UserService = require("../services/userService");
const jwt = require("jsonwebtoken");

class AuthController {
  static async register(req, res) {
    try {
      const user = await UserService.register(req.body);

      // Create JWT Token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );

      res.status(201).json({ token, user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const user = await UserService.login(req.body.email, req.body.password);

      // Create JWT Token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES_IN,
        }
      );

      res.status(200).json({ token, user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async forgotPassword(req, res) {
    try {
      const { token, expiration } =
        await UserService.generatePasswordResetToken(req.body.email);

      res.status(200).json({ message: "Password reset token sent" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async resetPassword(req, res) {
    try {
      await UserService.resetPassword(req.body.token, req.body.newPassword);
      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async verifyEmail(req, res) {
    try {
      await UserService.verifyEmail(req.params.token);
      res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;

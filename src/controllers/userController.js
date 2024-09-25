const UserService = require("../services/userService");

class UserController {
  static async getAllUsers(req, res) {
    try {
      if (req.user.role === "ADMIN") {
        const users = await UserService.getAllUsers();
        return res.status(200).json(users);
      } else if (req.user.role === "AUTHOR") {
        const user = await UserService.getUserById(req.user.id);
        return res.status(200).json([user]);
      } else {
        return res.status(403).json({ message: "Access denied" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (req.user.role === "ADMIN" || req.user.id === req.params.id) {
        return res.status(200).json(user);
      } else {
        return res.status(403).json({ message: "Access denied" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getPublicUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const publicData = {
        name: user.name,
        avatar: user.avatar,
      };
      res.status(200).json(publicData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      if (req.user.role !== "ADMIN" && req.user.id !== req.params.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      if (req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Access denied" });
      }

      await UserService.deleteUser(req.params.id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCurrentUser(req, res) {
    try {
      const user = await UserService.getUserById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async verifyOTP(req, res) {
    const { email, otp } = req.body;
    try {
      const user = await UserService.verifyOTP(email, otp);
      res.status(200).json({ message: "OTP verification successful", user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async regenerateOTP(req, res) {
    const { email } = req.body;
    try {
      const result = await UserService.regenerateOTP(email);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async requestPasswordReset(req, res) {
    const { email } = req.body;
    try {
      const result = await UserService.requestPasswordReset(email);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async resetPasswordWithOTP(req, res) {
    const { email, otp, newPassword } = req.body;
    try {
      const result = await UserService.resetPasswordWithOTP(
        email,
        otp,
        newPassword
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController;

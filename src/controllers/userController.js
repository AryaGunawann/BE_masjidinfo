const UserService = require("../services/userService");

class UserController {
  static async getAllUsers(req, res) {
    try {
      if (req.user.role === "ADMIN") {
        // Jika pengguna adalah admin, dapatkan semua pengguna
        const users = await UserService.getAllUsers();
        return res.status(200).json(users);
      } else if (req.user.role === "AUTHOR") {
        // Jika pengguna adalah author, hanya dapatkan data dirinya sendiri
        const user = await UserService.getUserById(req.user.id);
        return res.status(200).json([user]); // Mengembalikan dalam array agar formatnya konsisten
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

      if (
        req.user.role === "ADMIN" ||
        req.user.id === parseInt(req.params.id)
      ) {
        // Jika pengguna adalah admin atau pengguna yang ingin mengakses dirinya sendiri
        return res.status(200).json(user);
      } else {
        return res.status(403).json({ message: "Access denied" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      // Hanya ADMIN atau pengguna yang ingin memperbarui dirinya sendiri yang diizinkan
      if (
        req.user.role !== "ADMIN" &&
        req.user.id !== parseInt(req.params.id)
      ) {
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
      // Hanya ADMIN yang bisa menghapus pengguna
      if (req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Access denied" });
      }

      await UserService.deleteUser(req.params.id);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;

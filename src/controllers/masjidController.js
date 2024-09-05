const MasjidService = require("../services/masjidService");

class MasjidController {
  static async getAll(req, res) {
    try {
      // Semua pengguna dapat melihat semua masjid
      const masjids = await MasjidService.getAllMasjids();
      res.status(200).json(masjids);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      // Semua pengguna dapat melihat detail masjid berdasarkan ID
      const masjid = await MasjidService.getMasjidById(req.params.id);
      if (!masjid) {
        return res.status(404).json({ message: "Masjid not found" });
      }
      res.status(200).json(masjid);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      if (req.user.role !== "AUTHOR" && req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Access denied" });
      }

      // Mengambil ID user yang sedang login dari JWT
      const userId = req.user.id;

      const masjid = await MasjidService.createMasjid(req.body, userId);
      res.status(201).json(masjid);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const masjid = await MasjidService.getMasjidById(req.params.id);
      if (!masjid) {
        return res.status(404).json({ message: "Masjid not found" });
      }

      // Author hanya dapat mengedit masjid yang mereka buat
      if (req.user.role === "AUTHOR" && masjid.authorId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      // Admin dapat mengedit masjid apa pun
      const updatedMasjid = await MasjidService.updateMasjid(
        req.params.id,
        req.body,
        req.user.id
      );
      res.status(200).json(updatedMasjid);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const masjid = await MasjidService.getMasjidById(req.params.id);
      if (!masjid) {
        return res.status(404).json({ message: "Masjid not found" });
      }

      // Author hanya dapat menghapus masjid yang mereka buat
      if (req.user.role === "AUTHOR" && masjid.authorId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      // Admin dapat menghapus masjid apa pun
      await MasjidService.deleteMasjid(req.params.id);
      res.status(200).json({ message: "Masjid deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MasjidController;

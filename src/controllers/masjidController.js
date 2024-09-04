const MasjidService = require("../services/masjidService");

class MasjidController {
  static async getAll(req, res) {
    // Hanya admin yang dapat melihat semua masjid
    if (req.user.role === "ADMIN") {
      try {
        const masjids = await MasjidService.getAllMasjids();
        res.status(200).json(masjids);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else if (req.user.role === "AUTHOR") {
      // Author hanya dapat melihat masjid yang dia buat
      try {
        const masjids = await MasjidService.getMasjidsByAuthor(req.user.id);
        res.status(200).json(masjids);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(403).json({ message: "Access denied" });
    }
  }

  static async getById(req, res) {
    try {
      const masjid = await MasjidService.getMasjidById(req.params.id);
      if (!masjid) {
        return res.status(404).json({ message: "Masjid not found" });
      }

      // Author hanya dapat melihat masjid yang dia buat atau admin
      if (req.user.role === "AUTHOR" && masjid.authorId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      res.status(200).json(masjid);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const masjid = await MasjidService.createMasjid(req.body, req.user.id);
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

      // Admin bisa mengupdate semua masjid, Author hanya bisa mengupdate masjid yang dia buat
      if (req.user.role === "AUTHOR" && masjid.authorId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      const updatedMasjid = await MasjidService.updateMasjid(
        req.params.id,
        req.body
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

      // Hanya admin yang bisa menghapus masjid
      if (req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Access denied" });
      }

      await MasjidService.deleteMasjid(req.params.id);
      res.status(200).json({ message: "Masjid deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MasjidController;

const DetailMasjidService = require("../services/detailMasjidService");

class DetailMasjidController {
  // Semua pengguna dapat melihat semua detail masjid
  static async getAll(req, res) {
    try {
      const detailMasjids = await DetailMasjidService.getAllDetailMasjids();
      res.status(200).json(detailMasjids);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Semua pengguna dapat melihat detail masjid berdasarkan ID
  static async getById(req, res) {
    try {
      const detailMasjid = await DetailMasjidService.getDetailMasjidById(
        req.params.id
      );
      if (!detailMasjid) {
        return res.status(404).json({ message: "DetailMasjid not found" });
      }
      res.status(200).json(detailMasjid);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Author atau admin dapat membuat detail masjid baru
  static async create(req, res) {
    try {
      if (req.user.role !== "AUTHOR" && req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Access denied" });
      }
      const userId = req.user.id;

      const detailMasjid = await DetailMasjidService.createDetailMasjid(
        req.body,
        userId
      );
      res.status(201).json(detailMasjid);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Author hanya dapat mengedit detail masjid yang mereka buat, admin dapat mengedit detail masjid apa pun
  static async update(req, res) {
    try {
      const user = req.user;
      const detailMasjid = await DetailMasjidService.getDetailMasjidById(
        req.params.id
      );
      if (!detailMasjid) {
        return res.status(404).json({ message: "DetailMasjid not found" });
      }

      if (user.role === "AUTHOR" && detailMasjid.authorId !== user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      const updatedDetailMasjid = await DetailMasjidService.updateDetailMasjid(
        req.params.id,
        req.body
      );
      res.status(200).json(updatedDetailMasjid);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Author hanya dapat menghapus detail masjid yang mereka buat, admin dapat menghapus detail masjid apa pun
  static async delete(req, res) {
    try {
      const user = req.user;
      const detailMasjid = await DetailMasjidService.getDetailMasjidById(
        req.params.id
      );
      if (!detailMasjid) {
        return res.status(404).json({ message: "DetailMasjid not found" });
      }

      if (user.role === "AUTHOR" && detailMasjid.authorId !== user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      await DetailMasjidService.deleteDetailMasjid(req.params.id);
      res.status(200).json({ message: "DetailMasjid deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = DetailMasjidController;

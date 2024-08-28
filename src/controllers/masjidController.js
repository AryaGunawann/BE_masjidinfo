const MasjidService = require("../services/masjidService");

class MasjidController {
  static async create(req, res) {
    try {
      const user = req.user;
      if (user.role !== "author" && user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      const masjid = await MasjidService.createMasjid(req.body);
      res.status(201).json(masjid);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const masjids = await MasjidService.getAllMasjids();
      res.status(200).json(masjids);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const masjid = await MasjidService.getMasjidById(req.params.id);
      if (!masjid) {
        return res.status(404).json({ message: "Masjid not found" });
      }
      res.status(200).json(masjid);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const user = req.user;
      if (user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      const masjid = await MasjidService.updateMasjid(req.params.id, req.body);
      if (!masjid) {
        return res.status(404).json({ message: "Masjid not found" });
      }
      res.status(200).json(masjid);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const user = req.user;
      if (user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      const masjid = await MasjidService.deleteMasjid(req.params.id);
      if (!masjid) {
        return res.status(404).json({ message: "Masjid not found" });
      }
      res.status(200).json({ message: "Masjid deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MasjidController;

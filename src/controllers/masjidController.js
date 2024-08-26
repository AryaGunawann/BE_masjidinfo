const MasjidService = require("../services/masjidService");

class MasjidController {
  static async createMasjid(req, res) {
    try {
      const data = req.body;
      const newMasjid = await MasjidService.createMasjid(data);
      res.status(201).json(newMasjid);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllMasjids(req, res) {
    try {
      const masjids = await MasjidService.findAllMasjids();
      res.status(200).json(masjids);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getMasjidById(req, res) {
    try {
      const { id } = req.params;
      const masjid = await MasjidService.findMasjidById(id);
      if (masjid) {
        res.status(200).json(masjid);
      } else {
        res.status(404).json({ error: "Masjid not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateMasjid(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedMasjid = await MasjidService.updateMasjid(id, data);
      if (updatedMasjid) {
        res.status(200).json(updatedMasjid);
      } else {
        res.status(404).json({ error: "Masjid not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteMasjid(req, res) {
    try {
      const { id } = req.params;
      await MasjidService.deleteMasjid(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = MasjidController;

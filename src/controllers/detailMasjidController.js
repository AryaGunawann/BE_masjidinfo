const DetailMasjidService = require("../services/detailMasjidService");

class DetailMasjidController {
  static async create(req, res) {
    try {
      const data = req.body;
      const newDetailMasjid = await DetailMasjidService.createDetailMasjid(
        data
      );
      res.status(201).json(newDetailMasjid);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const detailMasjids = await DetailMasjidService.getAllDetailMasjids();
      res.status(200).json(detailMasjids);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.parasm;
      const detailMasjid = await DetailMasjidService.getDetailMasjidById(id);
      if (!detailMasjid) {
        return res.status(404).json({ error: "Detail Masjid not found" });
      }
      res.status(200).json(detailMasjid);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updateDetailMasjid = await DetailMasjidService.updateDetailMasjid(
        id,
        data
      );
      if (!updateDetailMasjid) {
        return res.status(404).json({ error: "Detail Masjid not found" });
      }
      res.status(200).json(updateDetailMasjid);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const deleteDetailMasjid = await DetailMasjidService.deleteDetailMasjid(
        id
      );
      if (!deleteDetailMasjid) {
        return res.status(404).json({ error: "Detail Masjid not Found" });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = DetailMasjidController;

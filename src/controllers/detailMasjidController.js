const DetailMasjidService = require("../services/detailMasjidService");

class DetailMasjidController {
  static async create(req, res) {
    try {
      const user = req.user;
      if (user.role !== "author" && user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      // Include user ID in the detail masjid data
      const detailMasjid = await DetailMasjidService.createDetailMasjid(
        req.body,
        user.id
      );
      res.status(201).json(detailMasjid);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const user = req.user;
      let detailMasjids;
      if (user.role === "admin") {
        detailMasjids = await DetailMasjidService.getAllDetailMasjids();
      } else if (user.role === "author") {
        detailMasjids = await DetailMasjidService.getDetailMasjidsByAuthor(
          user.id
        );
      } else {
        return res.status(403).json({ message: "Forbidden" });
      }
      res.status(200).json(detailMasjids);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const user = req.user;
      const detailMasjid = await DetailMasjidService.getDetailMasjidById(
        req.params.id
      );
      if (!detailMasjid) {
        return res.status(404).json({ message: "DetailMasjid not found" });
      }

      // Check if the user can view this DetailMasjid
      if (user.role === "author" && detailMasjid.authorId !== user.id) {
        return res.status(403).json({ message: "Forbidden" });
      }

      res.status(200).json(detailMasjid);
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

      const detailMasjid = await DetailMasjidService.updateDetailMasjid(
        req.params.id,
        req.body
      );
      if (!detailMasjid) {
        return res.status(404).json({ message: "DetailMasjid not found" });
      }
      res.status(200).json(detailMasjid);
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

      const detailMasjid = await DetailMasjidService.deleteDetailMasjid(
        req.params.id
      );
      if (!detailMasjid) {
        return res.status(404).json({ message: "DetailMasjid not found" });
      }
      res.status(200).json({ message: "DetailMasjid deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = DetailMasjidController;

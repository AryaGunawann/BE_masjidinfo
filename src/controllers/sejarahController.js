const SejarahService = require("../services/sejarahService");

class SejarahController {
  static async getAll(req, res) {
    try {
      const sejarahList = await SejarahService.getAllSejarah();
      res.status(200).json(sejarahList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const sejarah = await SejarahService.getSejarahById(req.params.id);
      if (!sejarah) {
        return res.status(404).json({ error: "Sejarah not found" });
      }
      res.status(200).json(sejarah);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    const userId = req.user.id;
    try {
      const Sejarah = await SejarahService.createSejarah(req.body, userId);
      res.status(201).json(Sejarah);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const sejarah = await SejarahService.getSejarahById(req.params.id);
      if (!sejarah) {
        return res.status(404).json({ error: "Sejarah not found" });
      }

      if (req.user.role === "author" && sejarah.authorId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      const updatedSejarah = await SejarahService.updateSejarah(
        req.params.id,
        req.body
      );
      res.status(200).json(updatedSejarah);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const sejarah = await SejarahService.getSejarahById(req.params.id);
      if (!sejarah) {
        return res.status(404).json({ error: "Sejarah not found" });
      }

      if (req.user.role === "author" && sejarah.authorId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      await SejarahService.deleteSejarah(req.params.id);
      res.status(204).json({ message: "Sejarah deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = SejarahController;

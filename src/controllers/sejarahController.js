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
      const { id } = req.params;
      const sejarah = await SejarahService.getSejarahById(id);
      if (!sejarah) {
        return res.status(404).json({ error: "Sejarah not found" });
      }
      res.status(200).json(sejarah);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const data = {
        ...req.body,
        authorId: req.user.id,
      };
      const newSejarah = await SejarahService.createSejarah(data);
      res.status(201).json(newSejarah);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const sejarah = await SejarahService.getSejarahById(id);
      if (!sejarah) {
        return res.status(404).json({ error: "Sejarah not found" });
      }

      if (req.user.role === "author" && sejarah.authorId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      const updatedSejarah = await SejarahService.updateSejarah(id, req.body);
      res.status(200).json(updatedSejarah);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const sejarah = await SejarahService.getSejarahById(id);
      if (!sejarah) {
        return res.status(404).json({ error: "Sejarah not found" });
      }

      if (req.user.role === "author" && sejarah.authorId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      await SejarahService.deleteSejarah(id);
      res.status(204).json({ message: "Sejarah deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = SejarahController;

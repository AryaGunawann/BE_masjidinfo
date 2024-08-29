const { sejarah } = require("../config/dbConfig");
const SejarahService = require("../services/sejarahService");

class SejarahController {
  static async create(req, res) {
    try {
      const user = req.user;
      if (user.role !== "author" && user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      const data = req.body;
      const newSejarah = await SejarahService.createSejarah(data);
      res.status(201).json(newSejarah);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

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

  static async update(req, res) {
    try {
      const user = req.user;
      if (user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      const { id } = req.params;
      const data = req.body;
      const updateSejarah = await SejarahService.updateSejarah(id, data);
      if (!updateSejarah) {
        return res.status(404).json({ error: "Sejarah not found" });
      }
      res.status(200).json(sejarah);
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
      const { id } = req.params;
      const deletedSejarah = await SejarahService.deleteSejarah(id);
      if (!deletedSejarah) {
        return res.status(404).json({ error: "Sejarah not found" });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = SejarahController;

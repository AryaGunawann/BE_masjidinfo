const HistoryService = require("../services/historyService");

class HistoryController {
  static async create(req, res) {
    try {
      const history = await HistoryService.createHistory(req.body);
      res.status(201).json(history);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const histories = await HistoryService.getAllHistories();
      res.status(200).json(histories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const history = await HistoryService.getHistoryById(req.params.id);
      if (!history) {
        return res.status(404).json({ message: "History not found" });
      }
      res.status(200).json(history);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async update(req, res) {
    try {
      const history = await HistoryService.updateHistory(
        req.params.id,
        req.body
      );
      if (!history) {
        return res.status(404).json({ message: "History not found" });
      }
      res.status(200).json(history);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const history = await HistoryService.deleteHistory(req.params.id);
      if (!history) {
        return res.status(404).json({ message: "History not found" });
      }
      res.status(200).json({ message: "History deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = HistoryController;

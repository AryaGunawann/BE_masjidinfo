const DiscussionService = require("../services/discussionService");

class DiscussionController {
  // Hanya author dan admin yang dapat membuat diskusi
  static async create(req, res) {
    try {
      const user = req.user;
      if (user.role !== "author" && user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      const discussion = await DiscussionService.createDiscussion(req.body);
      res.status(201).json(discussion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Hanya admin yang dapat melihat semua diskusi
  static async getAll(req, res) {
    try {
      const user = req.user;
      if (user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      const discussions = await DiscussionService.getAllDiscussions();
      res.status(200).json(discussions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Hanya admin yang dapat melihat diskusi berdasarkan ID
  static async getById(req, res) {
    try {
      const user = req.user;
      if (user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      const discussion = await DiscussionService.getDiscussionById(
        req.params.id
      );
      if (!discussion) {
        return res.status(404).json({ message: "Discussion not found" });
      }
      res.status(200).json(discussion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Hanya admin yang dapat memperbarui diskusi
  static async update(req, res) {
    try {
      const user = req.user;
      if (user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      const discussion = await DiscussionService.updateDiscussion(
        req.params.id,
        req.body
      );
      if (!discussion) {
        return res.status(404).json({ message: "Discussion not found" });
      }
      res.status(200).json(discussion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Hanya admin yang dapat menghapus diskusi
  static async delete(req, res) {
    try {
      const user = req.user;
      if (user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden" });
      }
      const discussion = await DiscussionService.deleteDiscussion(
        req.params.id
      );
      if (!discussion) {
        return res.status(404).json({ message: "Discussion not found" });
      }
      res.status(200).json({ message: "Discussion deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = DiscussionController;

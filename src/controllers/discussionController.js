const DiscussionService = require("../services/discussionService");

class DiscussionController {
  static async create(req, res) {
    try {
      const discussion = await DiscussionService.createDiscussion(req.body);
      res.status(201).json(discussion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const discussions = await DiscussionService.getAllDiscussions();
      res.status(200).json(discussions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
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

  static async update(req, res) {
    try {
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

  static async delete(req, res) {
    try {
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

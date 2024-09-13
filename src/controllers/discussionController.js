const DiscussionService = require("../services/discussionService");

class DiscussionController {
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

  // Yang bisa membuat komentar: semua role (USER, AUTHOR, ADMIN)
  static async create(req, res) {
    try {
      if (!["AUTHOR", "ADMIN", "USER"].includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      const discussion = await DiscussionService.createDiscussion({
        ...req.body,
        id_user: req.user.id,
      });
      res.status(201).json(discussion);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update bisa dilakukan oleh pembuat komentar, kecuali admin yang bisa mengedit semua komentar
  static async update(req, res) {
    try {
      const user = req.user;
      const discussion = await DiscussionService.getDiscussionById(
        req.params.id
      );

      if (!discussion) {
        return res.status(404).json({ message: "Discussion not found" });
      }

      // Hanya pembuat komentar atau admin yang bisa mengedit
      if (discussion.id_user !== user.id && user.role !== "ADMIN") {
        return res
          .status(403)
          .json({ message: "You are not authorized to update this comment" });
      }

      // Lakukan update pada komentar
      const updatedDiscussion = await DiscussionService.updateDiscussion(
        req.params.id,
        req.body
      );

      // Kirimkan response dengan pesan "diedit" jika komentar telah diupdate
      res.status(200).json({
        ...updatedDiscussion,
        message: "Comment updated successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Hanya pembuat komentar atau admin yang dapat menghapus komentar tersebut
  static async delete(req, res) {
    try {
      const user = req.user;
      const discussion = await DiscussionService.getDiscussionById(
        req.params.id
      );

      if (!discussion) {
        return res.status(404).json({ message: "Discussion not found" });
      }

      // Hanya pembuat komentar atau admin yang dapat menghapus
      if (discussion.id_user !== user.id && user.role !== "ADMIN") {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this comment" });
      }

      await DiscussionService.deleteDiscussion(req.params.id);
      res.status(200).json({ message: "Discussion deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = DiscussionController;

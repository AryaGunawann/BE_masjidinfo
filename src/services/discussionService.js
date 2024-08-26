const DiscussionModel = require("../models/discussionModel");

class DiscussionService {
  static async createDiscussion(data) {
    return await DiscussionModel.create(data);
  }

  static async getAllDiscussions() {
    return await DiscussionModel.findAll();
  }

  static async getDiscussionById(id) {
    return await DiscussionModel.findById(id);
  }

  static async updateDiscussion(id, data) {
    return await DiscussionModel.update(id, data);
  }

  static async deleteDiscussion(id) {
    return await DiscussionModel.delete(id);
  }
}

module.exports = DiscussionService;

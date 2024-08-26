const HistoryModel = require("../models/historyModel");

class HistoryService {
  static async createHistory(data) {
    return await HistoryModel.create(data);
  }

  static async getAllHistories() {
    return await HistoryModel.findAll();
  }

  static async getHistoryById(id) {
    return await HistoryModel.findById(id);
  }

  static async updateHistory(id, data) {
    return await HistoryModel.update(id, data);
  }

  static async deleteHistory(id) {
    return await HistoryModel.delete(id);
  }
}

module.exports = HistoryService;

const PhotoService = require("../services/photoService");

class PhotoController {
  static async create(req, res) {
    try {
      const user = req.user;
      if (user.role !== "author" && user.role !== "admin") {
        res.status(403).json({ message: "Forbidden" });
      }
      const data = req.body;
      const newPhoto = await PhotoService.createPhoto(data);
      res.status(201).json(newPhoto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const photoList = await PhotoService.getAllPhotos();
      res.status(200).json(photoList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const photo = await PhotoService.getPhotoById(id);
      if (!photo) {
        return res.status(404).json({ error: "Photo not found" });
      }
      res.status(200).json(photo);
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
      const updatedPhoto = await PhotoService.updatePhoto(id, data);
      if (!updatedPhoto) {
        return res.status(404).json({ error: "Photo not found" });
      }
      res.status(200).json(updatedPhoto);
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
      const deletedPhoto = await PhotoService.deletePhoto(id);
      if (!deletedPhoto) {
        return res.status(404).json({ error: "Photo not found" });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PhotoController;

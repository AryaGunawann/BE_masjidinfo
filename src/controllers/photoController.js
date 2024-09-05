const PhotoService = require("../services/photoService");

class PhotoController {
  // Semua pengguna dapat melihat semua foto
  static async getAll(req, res) {
    try {
      const photoList = await PhotoService.getAllPhotos();
      res.status(200).json(photoList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Semua pengguna dapat melihat foto berdasarkan ID
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

  // Author dan admin dapat membuat foto baru
  static async create(req, res) {
    try {
      if (req.user.role !== "AUTHOR" && req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Access denied" });
      }

      const userId = req.user.id;

      const newPhoto = await PhotoService.createPhoto(req.body, userId);
      res.status(201).json(newPhoto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Admin dapat mengedit semua foto
  // Author hanya dapat mengedit foto yang mereka buat sendiri
  static async update(req, res) {
    try {
      const user = req.user;
      const { id } = req.params;
      const data = req.body;
      const photo = await PhotoService.getPhotoById(id);
      if (!photo) {
        return res.status(404).json({ error: "Photo not found" });
      }

      if (user.role === "AUTHOR" && photo.authorId !== user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      const updatedPhoto = await PhotoService.updatePhoto(id, data);
      res.status(200).json(updatedPhoto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Admin dapat menghapus semua foto
  // Author hanya dapat menghapus foto yang mereka buat sendiri
  static async delete(req, res) {
    try {
      const user = req.user;
      const { id } = req.params;
      const photo = await PhotoService.getPhotoById(id);
      if (!photo) {
        return res.status(404).json({ error: "Photo not found" });
      }

      if (user.role === "AUTHOR" && photo.authorId !== user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      await PhotoService.deletePhoto(id);
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = PhotoController;

const express = require("express");
const router = express.Router();
const masjidController = require("../controller/posts.controller.js"); // Ganti dengan sesuai nama file controller yang benar

// Menghubungkan endpoint dengan fungsi-fungsi di masjidController (atau postsController)
router.get("/masjid", masjidController.getAll);
router.get("/masjid/:id", masjidController.getById);

module.exports = router;

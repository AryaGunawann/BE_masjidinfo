const express = require("express");
const router = express.Router();
const masjidController = require("../controller/posts.controller");

router.get("/masjid", masjidController.getAll);
router.get("/masjid/:id", masjidController.getById);
router.get("/masjid/search", masjidController.searchByName);

module.exports = router;

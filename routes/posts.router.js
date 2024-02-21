const express = require("express");
const router = express.Router();
const masjidController = require("../controller/posts.controller.js"); 


router.get("/masjid", masjidController.getAll);
router.get("/masjid/:id", masjidController.getById);

module.exports = router;

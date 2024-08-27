const express = require("express");
const DetailMasjidController = require("../controllers/detailMasjidController");

const router = express.Router();

router.post("/", DetailMasjidController.create);
router.get("/", DetailMasjidController.getAll);
router.get("/", DetailMasjidController.getById);
router.put("/", DetailMasjidController.update);
router.delete("/", DetailMasjidController.delete);

module.exports = router;

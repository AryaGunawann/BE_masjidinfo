const express = require("express");

const DetailMasjidController = require("../controllers/detailMasjidController");
const router = express.Router();

router.post("/detailmasjids", DetailMasjidController.create);
router.get("/detailmasjids", DetailMasjidController.getAll);
router.get("/detailmasjids/:id", DetailMasjidController.getById);
router.put("/detailmasjids/:id", DetailMasjidController.update);
router.delete(
  "/detailmasjids/:id",

  DetailMasjidController.delete
);

module.exports = router;

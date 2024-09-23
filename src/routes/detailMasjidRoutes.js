const express = require("express");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const DetailMasjidController = require("../controllers/detailMasjidController");
const router = express.Router();

router.get("/detailmasjids", DetailMasjidController.getAll);
router.get("/detailmasjids/slug/:slug", DetailMasjidController.getBySlug);
router.get("/detailmasjids/:id", DetailMasjidController.getById);

router.post(
  "/detailmasjids",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  DetailMasjidController.create
);

router.put(
  "/detailmasjids/:id",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  DetailMasjidController.update
);

router.delete(
  "/detailmasjids/:id",
  authenticate,
  authorize("ADMIN"),
  DetailMasjidController.delete
);

module.exports = router;

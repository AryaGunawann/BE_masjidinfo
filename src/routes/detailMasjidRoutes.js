const express = require("express");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const DetailMasjidController = require("../controllers/detailMasjidController");
const router = express.Router();

router.post(
  "/detailmasjids",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  DetailMasjidController.create
);
router.get(
  "/detailmasjids",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  DetailMasjidController.getAll
);
router.get(
  "/detailmasjids/:id",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  DetailMasjidController.getById
);
router.put(
  "/detailmasjids/:id",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  DetailMasjidController.update
);
router.delete(
  "/detailmasjids/:id",

  DetailMasjidController.delete
);

module.exports = router;

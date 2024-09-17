const express = require("express");
const UserController = require("../controllers/userController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
  "/",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  UserController.getAllUsers
);
router.get("/me", authenticate, UserController.getCurrentUser);

router.get("/public/:id", UserController.getPublicUserById);

router.get(
  "/:id",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  UserController.getUserById
);
router.put(
  "/:id",
  authenticate,
  authorize(["AUTHOR", "ADMIN"]),
  UserController.updateUser
);
router.delete(
  "/:id",
  authenticate,
  authorize(["ADMIN"]),
  UserController.deleteUser
);

module.exports = router;

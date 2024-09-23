const express = require("express");
const UserController = require("../controllers/userController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route untuk meminta reset password
router.post("/request-password-reset", UserController.requestPasswordReset);

// Route untuk reset password dengan OTP
router.post("/reset-password", UserController.resetPasswordWithOTP);

// Route untuk verifikasi OTP
router.post("/verify-otp", UserController.verifyOTP);

// Route untuk regenerasi OTP
router.post("/regenerate-otp", UserController.regenerateOTP);

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

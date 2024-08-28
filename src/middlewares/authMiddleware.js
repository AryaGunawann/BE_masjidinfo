const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.sendStatus(401); // Unauthorized

    const token = authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) return res.sendStatus(403); // Forbidden

      req.user = await UserModel.findById(user.id);
      req.role = user.role; // Add role to req
      next();
    });
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // Internal Server Error
  }
};

module.exports = authMiddleware;

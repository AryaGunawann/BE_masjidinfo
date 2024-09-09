require("dotenv").config(); // Memuat variabel lingkungan dari file .env

const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Middleware untuk autentikasi
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!req.user) return res.status(401).json({ message: "Invalid token" });
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware untuk otorisasi berdasarkan peran
const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

// Middleware untuk autentikasi token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Middleware untuk otorisasi berdasarkan peran dengan validasi pengguna
const authorizeRole = (roles) => {
  return async (req, res, next) => {
    if (!req.user) return res.sendStatus(401);
    if (!roles.includes(req.user.role)) return res.sendStatus(403);

    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) return res.sendStatus(403);

    next();
  };
};

// Middleware untuk autentikasi pengguna
const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware untuk otorisasi berdasarkan peran
const authorizationMiddleware = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (roles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ error: "Access denied" });
    }
  };
};

module.exports = {
  authenticate,
  authorize,
  authenticateToken,
  authorizeRole,
  authenticateUser,
  authorizationMiddleware,
};

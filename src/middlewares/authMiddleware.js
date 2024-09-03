const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authenticate = async (req, res, next) => {
  // Mengambil seluruh header Authorization sebagai token
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!req.user) return res.status(401).json({ message: "Invalid token" });
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization; // Mengambil seluruh header Authorization sebagai token

  if (token == null) return res.sendStatus(401); // Tidak ada token ditemukan

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token tidak valid
    req.user = user;
    next();
  });
};

// Middleware untuk otorisasi berdasarkan peran pengguna
const authorizeRole = (roles) => {
  return async (req, res, next) => {
    if (!req.user) return res.sendStatus(401); // Tidak ada informasi pengguna
    if (!roles.includes(req.user.role)) return res.sendStatus(403); // Akses ditolak

    // Validasi opsional: Memeriksa apakah pengguna ada di database
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    if (!user) return res.sendStatus(403); // Pengguna tidak ditemukan

    next();
  };
};

const authenticateUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

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

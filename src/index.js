const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const masjidRoutes = require("./routes/masjidRoutes");
const detailMasjidRoutes = require("./routes/detailMasjidRoutes");
const photoRoutes = require("./routes/photoRoutes");
const sejarahRoutes = require("./routes/sejarahRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const masjidCategoryRoutes = require("./routes/masjidCategoryRoutes");
const discussionRoutes = require("./routes/discussionRoutes");
const historyRoutes = require("./routes/historyRoutes");

app.use(
  cors({
    origin: ["http://localhost:3000", "https://masjidinfo-backend.vercel.app"],
    methods: "GET,POST,PUT,DELETE",
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Masjid Info API" });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", masjidRoutes);
app.use("/api", detailMasjidRoutes);
app.use("/api", photoRoutes);
app.use("/api", sejarahRoutes);
app.use("/api", categoryRoutes);
app.use("/api", masjidCategoryRoutes);
app.use("/api", discussionRoutes);
app.use("/api", historyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

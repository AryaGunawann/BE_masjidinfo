const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");
const masjidRoutes = require("./src/routes/masjidRoutes");
const detailMasjidRoutes = require("./src/routes/detailMasjidRoutes");
const photoRoutes = require("./src/routes/photoRoutes");
const sejarahRoutes = require("./src/routes/sejarahRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const masjidCategoryRoutes = require("./src/routes/masjidCategoryRoutes");
const discussionRoutes = require("./src/routes/discussionRoutes");
const historyRoutes = require("./src/routes/historyRoutes");

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,POST,PUT,DELETE",
  })
);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const masjidRoutes = require("./routes/masjidRoutes");
const detailMasjidRoutes = require("./routes/detailMasjidRoutes");
const photoRoutes = require("./routes/photoRoutes");
const sejarahRoutes = require("./routes/sejarahRoutes");
const categoryRoutes = require("./routes/categoryController");
const discussionRoutes = require("./routes/discussionRoutes");
const historyRoutes = require("./routes/historyController");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", masjidRoutes);
app.use("/api", detailMasjidRoutes);
app.use("/api", photoRoutes);
app.use("/api", sejarahRoutes);
app.use("/api", categoryRoutes);
app.use("/api", discussionRoutes);
app.use("/api", historyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const masjidRoutes = require("./routes/masjidRoutes");
// const detailMasjidRoutes = require("./routes/detailMasjidRoutes");
// const photoRoutes = require("./routes/photoRoutes");
// const sejarahRoutes = require("./routes/sejarahRoutes");
// const categoryRoutes = require("./routes/categoryRoutes");
// const discussionRoutes = require("./routes/discussionRoutes");
// const historyRoutes = require("./routes/historyRoutes");

app.use("/api/masjids", masjidRoutes);
// app.use("/api/detailMasjids", detailMasjidRoutes);
// app.use("/api/photos", photoRoutes);
// app.use("/api/sejarahs", sejarahRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/discussions", discussionRoutes);
// app.use("/api/histories", historyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

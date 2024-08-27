const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const masjidRoutes = require("./routes/masjidRoutes");
const detailMasjidRoutes = require("./routes/detailMasjidRoutes");
const sejarahRoutes = require("./routes/sejarahRoutes");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/masjids", masjidRoutes);
app.use("/detailMasjids", detailMasjidRoutes);
// app.use("/api/photos", photoRoutes);
app.use("/sejarah", sejarahRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/discussions", discussionRoutes);
// app.use("/api/histories", historyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

require("dotenv").config();

const express = require("express");
const app = express();
const postsRoutes = require("./routes/posts.router");

app.use("/api", postsRoutes);

// Port yang digunakan untuk aplikasi
const port = process.env.PORT || 3000;

// Mendengarkan pada port yang telah ditentukan
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

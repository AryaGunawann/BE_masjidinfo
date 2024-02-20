require("dotenv").config(); // Membaca nilai dari file .env

const express = require("express");
const app = express();
const postsRoutes = require("./routes/posts.router");

// Menggunakan rute-rute posts
app.use("/api", postsRoutes);

// Port yang digunakan untuk aplikasi
const port = process.env.PORT || 3000; // Menggunakan nilai dari .env atau default 3000

// Mendengarkan pada port yang telah ditentukan
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

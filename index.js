// Import module yang diperlukan
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware CORS untuk mengatasi masalah CORS
app.use(cors());

// Import rute postsRoutes
const postsRoutes = require("./routes/postsRoutes");

// Menggunakan rute-rute posts
app.use("/api", postsRoutes);

// Port yang digunakan untuk aplikasi
const port = process.env.PORT || 3000;

// Mendengarkan pada port yang telah ditentukan
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

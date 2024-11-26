const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();



// Khai báo các Routes cho ứng dụng 
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");


const app = express();



app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.get("/",  function(req, res){
  res.send("helldddsd");
});
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

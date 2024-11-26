const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");

const app = express();



app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);
app.get("/",  function(req, res){
  res.send("helldddsd");
});


// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

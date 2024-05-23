const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const bodyParser = require("body-parser");
const blogRoutes = require("./routes/blog");
const userDetails = require("./routes/details");
const forgotRoutes = require("./routes/forgot");
const articleData = require("./routes/articleDATA");
require("dotenv").config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
mongoose
  .connect(
    process.env.MONGO_URI,
    { dbName: "blogEJY" }
  )
  .then(() => {
    console.log("mongoDD connected");
  });

app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);
app.use("/detail", userDetails);
app.use("/reset", forgotRoutes);
app.use("/article", articleData);

app.get("*", (req, res) => {
  res.status(200).json({ info: "something" });
});
app.listen(port, () => console.log(`server.js running on port: ${port}`));

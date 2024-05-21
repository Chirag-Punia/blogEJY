const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const bodyParser = require("body-parser");
const blogRoutes = require("./routes/blog")
require("dotenv").config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://cpuniabe21:RH7bxwKzcPyljZgR@cluster0.zxrnern.mongodb.net/" ,
    { dbName: "blogEJY" }
  )
  .then(() => {
    console.log("mongoDD connected");
  });


app.use("/auth", authRoutes);
app.use("/blog",blogRoutes)


app.get("*", (req, res) => {
  res.status(200).json({ info: "something" });
});
app.listen(port, () => console.log(`server.js running on port: ${port}`));
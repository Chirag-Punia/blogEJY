const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");
const user = mongoose.model("user", userSchema);
const jwt = require("jsonwebtoken");
const { SECRET, authenticateJwt } = require("../middleware/auth");



router.get("/all", async (req, res) => {
    await user.find().then((user) => {
      if (user) {
        res.json({ user });
      } else {
        res.json({ message: "User not logged in" });
      }
    });
  });


  

module.exports = router
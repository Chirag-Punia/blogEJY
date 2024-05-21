const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");
const user = mongoose.model("user", userSchema);


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  await user.findOne({ email }).then((user) => {
    if (user) {
      if (password !== user.password) {
        res.json({ msg: "Wrong password" });
      } else {
        res.json({ msg: "Login successfully" ,user});
      }
    } else {
      res.json({ msg: "User does not exist" });
    }
  });
});

router.post("/signup", async (req, res) => {
  const { email, password, name, confirmpassword,dob,gender,location,phoneNo } = req.body;
  if (!name || !email || !password || !confirmpassword) {
    res.send("Enter all required field");
  } else if (password !== confirmpassword) {
    res.send("password does not match");
  } else if (password.length < 2) {
    res.send("Password should be at least 6 characters");
  } else {
    await user.findOne({ email: email }).then(async (obj) => {
      if (obj) {
        res.send("Email already exist");
      } else {
        const newUser = new user({
          email,
          name,
          password,
          dob,
          gender,
          location,
          phoneNo
        });
        await newUser.save();
        res.send("User created");
      }
    });
  }
});

router.get("/me", async (req, res) => {
  const {email} = req.body;
  await user.findOne(email).then((user) => {
    if (user) {
      res.json({user});
    } else {
      res.json({ message: "User not logged in" });
    }
  });
});



module.exports = router;
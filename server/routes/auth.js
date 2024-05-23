const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");
const user = mongoose.model("user", userSchema);
const jwt = require("jsonwebtoken");
const { SECRET, authenticateJwt } = require("../middleware/auth");


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  await user.findOne({ email }).then((user) => {
    if (user) {
      if (password !== user.password) {
        res.json({ msg: "Wrong password" });
      } else {
        const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
        res.json({ msg: "Login successfully", user, token });
      }
    } else {
      res.json({ msg: "User does not exist" });
    }
  });
});

router.post("/signup", async (req, res) => {
  const {
    email,
    password,
    name,
    confirmpassword,
    dob,
    gender,
    location,
    phoneNo,
  } = req.body;

  if (!name || !email || !password || !confirmpassword) {
    res.send("Enter all required field");
  } else if (password !== confirmpassword) {
    res.send("password does not match");
  } else if (password.length < 2) {
    res.send("Password should be at least 6 characters");
  } else {
    // await user.findOne({ email: email }).then(async (obj) => {
    //   if (obj) {
    //     res.send("Email already exist");
    //   } else if (obj) {
    //     await user.findOne({ phoneNo }).then(async (obj2) => {
    //       if (obj2) {
    //         res.send("Phone Number already exist");
    //       } else {
    //         const newUser = new user({
    //           email,
    //           name,
    //           password,
    //           dob,
    //           gender,
    //           location,
    //           phoneNo,
    //         });
    //         await newUser.save();
    //         res.send("User created");
    //       }
    //     });
    //   }
    // });
    const newUser = new user({
      email,
      name,
      password,
      dob,
      gender,
      location,
      phoneNo,
    });
    await newUser.save();
    res.send("User created");
  }
});

router.get("/me", authenticateJwt, async (req, res) => {
  await user.findOne({ _id: req.headers.userID }).then((user) => {
    if (user) {
      res.json({ user });
    } else {
      res.json({ message: "User not logged in" });
    }
  });
});

router.delete("/user/del", async (req, res) => {
  const { ID } = req.body;
  await user.findOne({ _id: ID }).then(async (obj) => {
    if (obj.role == "admin") {
      res.send("Admin");
    } else {
      await user.findOneAndDelete({ _id: ID }).then(() => {
        res.send("deleted");
      });
    }
  });
});

router.post("/user/verify", async (req, res) => {
  const { ID } = req.body;
  await user
    .findOneAndUpdate({ _id: ID }, { $set: { verified: true } })
    .then(async (obj) => {
      if (obj) {
        res.send("Verified");
      }
    });
});
router.post("/user/verify/ph", async (req, res) => {
  const { phoneNo } = req.body;
  await user
    .findOneAndUpdate({ phoneNo }, { $set: { verified: true } })
    .then(async (obj) => {
      if (obj) {
        res.send("Verified");
      } else {
        res.send("Not Verified");
      }
    });
});

router.post("/sendOTP", async (req, res) => {
  const { mobileNumber } = req.body;

  const accountSid = process.env.ACCOUNTSID;
  const authToken = process.env.AUTHTOKEN;
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: "EJY HEALTH - OTP for verification is 54321",
      from: "+15515258265",
      to: `+91${mobileNumber}`,
    })
    .then((message) => console.log(message.sid));
  res.send("OTP sent successfully");
});

module.exports = router;

const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");
const user = mongoose.model("user", userSchema);
const nodemailer = require("nodemailer");

const handleJOB = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.XEMAIL,
      pass: process.env.PASS,
    },
  });
  const info = await transporter.sendMail({
    from: {
      name: "EJY Health",
      address: process.env.XEMAIL,
    },
    to: [email],
    subject: "OTP",
    text: "Your OTP for reset password is 1234",
  });
};

router.post("/user/forgot", async (req, res) => {
  const { email } = req.body;
  await user.findOne({ email: email }).then(async (obj) => {
    if (!obj) {
      res.send("user do not exist");
    } else {
      await handleJOB(email);
      res.send("sent");
    }
  });
});
router.post("/user/forgot/verify", async (req, res) => {
  const { email, otp } = req.body;
  await user.findOne({ email: email }).then((obj) => {
    if (obj) {
      if (otp == "1234") {
        res.send("verified");
      } else {
        res.send("error");
      }
    } else {
      res.send("user does not exist");
    }
  });
});
router.post("/user/forgot/change", async (req, res) => {
  const { email, password } = req.body;

  await user
    .findOneAndUpdate({ email: email }, { $set: { password: password } })
    .then(async (obj) => {
      if (obj) {
        res.send("Password changed successfully");
      }
    });
});

module.exports = router;

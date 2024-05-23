const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    default: "viewer",
  },
  phoneNo: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  dob: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  verified: {
    type: Boolean,
    required: false,
    default: false,
  },
});

module.exports = userSchema;

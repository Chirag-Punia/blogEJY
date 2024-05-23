const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  image: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  summary: {
    type: String,
    required: false,
  },
  impressions: {
    type: String,
    required: false,
  },
  verified: {
    type: Boolean,
    default: false,
    required: false,
  },
  authorID: {
    type: String,
    required: false,
  },
  isPublished: {
    type: Boolean,
    required: false,
    default: false,
  },
});

module.exports = cardSchema;

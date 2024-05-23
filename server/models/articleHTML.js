const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  image: {
    type: String,
    required: false,
  },
  htmlCode: {
    type: String,
    required: false,
  },
  articleID: {
    type: String,
    required: false,
  },
});

module.exports = articleSchema;

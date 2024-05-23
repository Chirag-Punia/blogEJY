const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const articleSchema = require("../models/articleHTML");
const Article = mongoose.model("Article", articleSchema);

router.post("/data", async (req, res) => {
  const { ID } = req.body;
  await Article.find({ articleID: ID }).then((article) => {
    res.json({ article });
  });
});

module.exports = router;

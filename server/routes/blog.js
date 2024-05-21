const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");
const user = mongoose.model("user", userSchema);
const cardSchema = require("../models/data");
const Card = mongoose.model("Card",cardSchema);

router.post("/create", async (req, res) => {
  const formData = req.body;

  const newCard = new Card({
    image : formData.image,
    titile : formData.title,
    summary : formData.summary,
    impressions : formData.impressions
  });
  await newCard.save();
  res.sendStatus(200);
});

router.post("/data", async(req,res) => {
    await Card.find().then((cards) => {
        res.json({cards});
    })
})

module.exports = router;

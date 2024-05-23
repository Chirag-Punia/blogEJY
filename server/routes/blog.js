const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");
const user = mongoose.model("user", userSchema);
const cardSchema = require("../models/data");
const Card = mongoose.model("Card", cardSchema);
const { authenticateJwt } = require("../middleware/auth");

router.post("/create", authenticateJwt, async (req, res) => {
  const { formData, token } = req.body;
  const ID = req.headers.userID;
  const newCard = new Card({
    image: formData.image,
    titile: formData.title,
    summary: formData.summary,
    impressions: formData.impressions,
    authorID: ID,
  });
  await newCard.save();
  res.sendStatus(200);
});

router.post("/data", async (req, res) => {
  await Card.find().then((cards) => {
    res.json({ cards });
  });
});
router.post("/data/me", authenticateJwt, async (req, res) => {
  await Card.find({ authorID: req.headers.userID }).then((cards) => {
    res.json({ cards });
  });
});

router.post("/data/me/edit", async (req, res) => {
  const {cardID} = req.body;

  await Card.find({ _id: cardID }).then((cards) => {

    res.json({ cards });
  });
});
router.patch("/verify", async (req, res) => {
  const { ID } = req.body;
  await Card.findOneAndUpdate({ _id: ID }, { $set: { verified: true } }).then(
    (user) => {
      res.status(200).send(user);
    }
  );
});

router.patch("/edit", async (req, res) => {
  const {cardID,title,image,summary,impressions} = req.body
  console.log(cardID,title,image,summary,impressions)
  await Card.findOneAndUpdate({ _id: cardID }, { $set: { title:title} ,$set:{image:image},$set :{summary:summary},$set :{impressions:impressions} } ).then(
    (user) => {
      res.status(200).send(user);
    }
  );
});

router.patch("/publish", async (req, res) => {
  const { ID } = req.body;
  await Card.findOne({ _id: ID }).then(async (card) => {
    if (card.verified) {
      await Card.findOneAndUpdate(
        { _id: ID },
        { $set: { isPublished: true } }
      ).then((user) => {
        res.send("Updated");
      });
    } else {
      res.send("Not Verified");
    }
  });
});

router.delete("/del", async (req, res) => {
  const { ID } = req.body;
  await Card.findOneAndDelete({ _id: ID }).then(async (obj) => {
    res.sendStatus(200);
  });
});

module.exports = router;

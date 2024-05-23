const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const userSchema = require("../models/user");
const user = mongoose.model("user", userSchema);
const cardSchema = require("../models/data");
const Card = mongoose.model("Card", cardSchema);
const { authenticateJwt } = require("../middleware/auth");
const schedule = require("node-schedule");
const nodemailer = require("nodemailer");
const articleSchema = require("../models/articleHTML");
const Article = mongoose.model("Article", articleSchema);
const { htmlCode, sampleMail } = require("../sampleData/data");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.XEMAIL,
    pass: process.env.PASS,
  },
});
const handleJob = async (email) => {
  schedule.scheduleJob("* * * * 1", async () => {
    console.log("Job started");
    const info = await transporter.sendMail({
      from: {
        name: "EJY Health",
        address: process.env.XEMAIL,
      },
      to: [email],
      subject: "Weekly Newsletter",
      text: "HERE IS TOP HEALTH TIPS FROM EJY HEALTH",
      html: sampleMail,
    });
    console.log("Message sent: %s", info.messageId);
  });
};
router.post("/create", authenticateJwt, async (req, res) => {
  const { formData } = req.body;
  const ID = req.headers.userID;

  const newCard = new Card({
    image: formData.image,
    title: formData.title,
    summary: formData.summary,
    impressions: formData.impressions,
    authorID: ID,
  });

  await newCard.save();
  res.sendStatus(200);
});

router.post("/create/article", authenticateJwt, async (req, res) => {
  const { formData } = req.body;
  await Card.findOne({ title: formData.title }).then(async (obj) => {
    if (obj) {
      const newArticle = new Article({
        image: formData.image,
        articleID: obj._id,
        htmlCode: htmlCode,
      });
      await newArticle.save();
      res.send("article created");
    }
  });
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
  const { cardID } = req.body;

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
  const { cardID, title, image, summary, impressions } = req.body;
  await Card.findOneAndUpdate(
    { _id: cardID },
    {
      $set: { title: title },
      $set: { image: image },
      $set: { summary: summary },
      $set: { impressions: impressions },
    }
  ).then((user) => {
    res.status(200).send(user);
  });
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
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  await user.findOne({ email: email }).then(async (obj) => {
    if (obj) {
      res.send("user");
      await handleJob(email);
    } else {
      res.send("No user");
    }
  });
});

module.exports = router;

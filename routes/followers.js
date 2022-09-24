const express = require("express");
const router = express.Router();
//const Twit = require('twit');

router.get("/", (req, res) => {
  res.render("followers");
});

module.exports = router;

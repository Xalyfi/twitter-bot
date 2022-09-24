//ルーター
const express = require("express");
const router = express.Router();

router.get('/', function(req, res) {
  if (!req.user) {
    res.redirect('/login');
  } else {
    res.render('home',{user:req.user.username});
  }
});

//モジュールのエクスポート
module.exports = router;

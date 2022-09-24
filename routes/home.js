//ルーター
const express = require("express");
const router = express.Router();

//ルーティング
//アロー関数を使う
router.get("/", (req, res) => {
  res.render("home");
});

//モジュールのエクスポート
module.exports = router;

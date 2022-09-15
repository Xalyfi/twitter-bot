//ejsでサイトを作る

//モジュールの読み込み
const express = require('express');
const app = express();
const ejs = require('ejs');
const fs = require('fs');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer({dest: './uploads/'});
const path = require('path');

//ejsの設定
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//セッションの設定
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));

//body-parserの設定
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//静的ファイルの設定
app.use(express.static('public'));

//ルーティング
//今回はルーティングを別ファイルに分けている
const home = require('./routes/home.js');
app.use('/', home);

//サーバーの起動
app.listen(3000, function(){
    console.log('server start');
});

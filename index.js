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
const logger = require('morgan');



app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');




app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



const home = require('./routes/home.js');
app.use('/', home);

//サーバーの起動
app.listen(80, function(){
    console.log('server start');
});

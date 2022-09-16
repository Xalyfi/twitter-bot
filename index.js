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
const { twitterOAuth2 } = require('twitter-oauth2');
const {client_secret} = require('./config.json');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');




app.use(session({
    name: 'Xalyfi on Twitter',
    secret: 'NzU3MTA2OTE3OTQ3NjA1MDM0',
    resave: false,
    saveUninitialized: true
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(twitterOAuth2({
    client_id: 'ZzBUX2VZY2hJRWxCTXp4SUlLQ1Y6MTpjaQ',
    client_secret: client_secret,
    redirect_uri: 'https://minato37103710-xalyfi-twitter-bot-v574p4gqx7x3wv7v-80.githubpreview.dev/login',
    scope: 'tweet.read users.read offline.access'
}))


const home = require('./routes/home.js');
const followers = require('./routes/followers.js');
const login = require('./routes/login.js');


app.use('/', home);
app.use('/followers', followers);
app.use('/login', login);


//サーバーの起動
app.listen(80, function(){
    console.log('server start');
});

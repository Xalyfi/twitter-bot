require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var TwitterStrategy = require('passport-twitter');
const { config } = require('dotenv');

/*var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');*/

var app = express();
var SQLiteStore = require('connect-sqlite3')(session);

app.locals.pluralize = require('pluralize');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
//npmモジュールのロード
//Expressでpassportが使えるようにする
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// passport-twitterの初期化
passport.use(new TwitterStrategy({
        consumerKey: require('./config.json').consumer_key,//TwitterのconsumerKey
        consumerSecret: require('./config.json').cnsumer_secret,//TwitterのconsumerSecret
        callbackURL: require('./config.json').BASE_URL+'/auth/twitter/callback'//認証成功時の戻り先URL
    },
    function(token, tokenSecret, profile, done) {
        // 認証が完了したtwitterIdを検証する
        // 例えばtwitteridがDBの中に存在するかということを確認する
        // 検証結果によってdoneの書き方を以下のように指定する
        //     検証成功 : return done(null,profile);
        //     検証失敗 : return done(null,false);
        //     例外発生 : return done(null);
        return done(null,profile);
    }
));

app.get('/', function(req, res) {
    res.render('home',{user:req.user.username});
});

//自作サービス中でtwitter認証を行うURLを設定する
app.get('/login',
    passport.authenticate('twitter'));

//認証正常時の戻り先URLの設定をする
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/' }),//認証失敗時のリダイレクト先を書く
    function(req, res) {
        // ここでは認証成功時のルーティング設定を書く
        // ちなみにreq.userでログインユーザの情報が取れる
        //     例) req.user.useridでユーザIDがとれます
        res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(80, () => {
    console.log('Server is running on port 80');
});

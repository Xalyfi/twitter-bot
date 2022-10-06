require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const TwitterStrategy = require('passport-twitter');
const { config } = require('dotenv');


const indexRouter = require('./routes/home');
const followersRouter = require('./routes/followers');
const followsRouter = require('./routes/follows');
const loginRouter = require('./routes/login')
const authRouter = require('./routes/auth');

const app = express();
const SQLiteStore = require('connect-sqlite3')(session);


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
  secret: 'Xalyfi',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
//npmモジュールのロード
//Expressでpassportが使えるようにする
app.use(passport.session());


app.use('/', indexRouter);
app.use('/followers', followersRouter);
app.use('/follows', followsRouter);
app.use('/login',loginRouter)
app.use('/auth', authRouter);

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

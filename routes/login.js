const express = require('express');
const router = express.Router();
const passport = require('passport');
const TwitterStrategy = require('passport-twitter');

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// passport-twitterの初期化
passport.use(new TwitterStrategy({
        consumerKey: require('../config.json').consumer_key,//TwitterのconsumerKey
        consumerSecret: require('../config.json').cnsumer_secret,//TwitterのconsumerSecret
        callbackURL: require('../config.json').BASE_URL+'/auth/twitter/callback'//認証成功時の戻り先URL
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

//自作サービス中でtwitter認証を行うURLを設定する
router.get('/',
    passport.authenticate('twitter'));

module.exports = router;
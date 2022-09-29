const express = require('express');
const router = express.Router();
const passport = require('passport');
const TwitterStrategy = require('passport-twitter');
const { TwitterApi } = require('twitter-api-v2');

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

// passport-twitterの初期化
passport.use(new TwitterStrategy({
        consumerKey: require('../config.json').consumer_key,//TwitterのconsumerKey
        consumerSecret: require('../config.json').consumer_secret,//TwitterのconsumerSecret
        callbackURL: require('../config.json').BASE_URL+'/followers'//認証成功時の戻り先URL
    },
    async function(token, tokenSecret, profile, done) {
        // 認証が完了したtwitterIdを検証する
        // 例えばtwitteridがDBの中に存在するかということを確認する
        // 検証結果によってdoneの書き方を以下のように指定する
        //     検証成功 : return done(null,profile);
        //     検証失敗 : return done(null,false);
        //     例外発生 : return done(null);
        return done(null,profile);
    }
));

//ユーザーのフォロワーを取得する
router.get('/',
    async function(req,res){
        const api = new TwitterApi({
            appKey: require('../config.json').consumer_key,
            appSecret: require('../config.json').consumer_secret,
            accessToken: '',
            accessSecret: '',
        });
        const follows = await api.v2.following('1554780761173426176',{"user.fields":'name,profile_image_url,description'});
        console.log(follows);
        res.render('follows',{follows:follows});
});


module.exports = router;
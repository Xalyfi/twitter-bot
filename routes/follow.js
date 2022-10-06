const express = require('express');
const router = express.Router();
const { TwitterApi } = require('twitter-api-v2');

//ユーザーのフォロワーを取得する
router.get('/',async function(req,res){
    if (req.user) {
        const api = new TwitterApi({
            appKey: require('../config.json').consumer_key,
            appSecret: require('../config.json').consumer_secret,
            accessToken: require('../config.json').access_token,
            accessSecret: require('../config.json').access_token_secret,
        });
        const follows = await api.v2.following(req.user.id,{"user.fields":'name,profile_image_url,description','pagination_token':req.query.page});
        res.render('follows',{follows:follows});
    } else {
        //認証されていない場合はloginにリダイレクトする
        res.status(401).redirect('/login');
    }
});


module.exports = router;
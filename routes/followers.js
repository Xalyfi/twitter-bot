const express = require('express');
const router = express.Router();
const { TwitterApi } = require('twitter-api-v2');


//認証した後のリダイレクト先を/followersに設定する
router.get('/',async function(req, res) {
    if (req.user) {
        const api = new TwitterApi({
            appKey: require('../config.json').consumer_key,
            appSecret: require('../config.json').consumer_secret,
            accessToken: require('../config.json').access_token,
            accessSecret: require('../config.json').access_token_secret,
        });
        const follower = await api.v2.followers(req.user.id,{"user.fields":'name,profile_image_url,description'});
        res.render('followers',{followers:follower});
    } else {
        //認証されていない場合はエラーを返す
        res.status(401).send('Unauthorized');
    }
});


module.exports = router;
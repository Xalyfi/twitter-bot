const express = require('express');
const router = express.Router();
const { request } = require('undici');


router.get('/', async (req , res) => {
    const tokenSet = req.session.tokenSet;
    console.log('received tokens %j', req.session.tokenSet);
    const { body } = await request('https://api.twitter.com/2/users/me',
      {
        headers: {
          Authorization: `Bearer ${tokenSet?.access_token}`
        }
      });
    const userdata = (await body.json()).data;
    const username = userdata.name;

    res.send(userdata.access_token);
})

module.exports = router;
var express = require('express');
var router = express.Router();
var userCollection = require('../models/userModel')
var verifyToken = require('../middleware/verifyToken')
var verifyOpenId = require('../middleware/verifyOpenId')
const axios = require('axios')

/* Get ME */
router.get('/me', verifyToken, (req, res, next) => {
  res.json(req.user)
})

router.get('/login', (req, res, next) => {
  if (!req.body.jsCode) {
    res.json({
      status: 1101,
      message: 'Invalid JS code'
    })
  } else {
    let code = req.body.jsCode
    let appid = 'wx7eb82154835d809d'
    let appKey = 'df362811ad98574e8ea39b1e55032389'

    axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appKey}&js_code=${code}&grant_type=authorization_code`).then((resp) => {
      console.log(resp.data)
      let openid = resp.data.openid
      if (openid) {
        userCollection.findOne({ openid: openid }, function (err, user) {
          if (err) {
            res.json({
              status: 1011,
              message: 'Unkwon Error',
              err
            })
          } else {
            if (!user) {
              res.json({
                status: 1012,
                message: 'User Not found',
                openid
              })
            } else {
              res.json({
                status: 200,
                message: '',
                data: user
              })
            }
          }
        })
      } else {
        res.json({
            status: 1122,
            data: resp.data
          })
      }
    })
  }
})
module.exports = router;

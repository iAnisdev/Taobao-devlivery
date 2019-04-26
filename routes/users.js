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
    let appid = process.env.appid
    let appSecret = process.env.appSecret
    axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`).then((resp) => {
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

router.post('/register' , (req , res , next ) => {
  if(!req.body.jsCode || !req.body.wxObj || !req.body.phone){
    res.json({
      status: 1101,
      message: 'Invalid JS code'
    })
  }else{
    let code = req.body.jsCode
    let wxObj = req.body.wxObj
    let appid = process.env.appid
    let appSecret = process.env.appSecret
    axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`).then((resp) => {
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
              userCollection.findOne({}, {}, { sort: { id: -1 } }, function (err, record) {
                let id;
                if(record){
                  id= record.id + 1;
                }else{
                  id = 1
                }
                let userObj = {
                  lname: wxObj.nickName,
                  avatarUrl: wxObj.avatarUrl,
                  id: id,
                  openid: openid,
                  phone: req.body.phone,
                  password: req.body.phone,
                  gender: wxObj.gender,
                  country: wxObj.country,
                  province: wxObj.province,
                  city: wxObj.city
                }
                let newUser = new userCollection(userObj)

              })
            } else {
              res.json({
                status: 1013,
                message: 'Already Registered',
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

router.get('/cart' , (req , res , next) => {

})

router.post('/cart/update' , (req , res , next) => {
  
})

router.get('/address' , verifyToken , (req , res , next) => {

})
router.post('/Address/add' , verifyToken , (req , res , next) => {

})

module.exports = router;

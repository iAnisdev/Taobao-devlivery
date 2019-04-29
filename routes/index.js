var express = require('express');
var router = express.Router();
const axios = require('axios')
const WXBizDataCrypt = require('./../middleware/WXBizDataCrypt')

/* GET home page. */
router.get('/decrypt', function (req, res, next) {
  if (!req.body.jsCode || !req.body.iv || !req.body.encryptedData) {
    res.json({
      status: 1001,
      message: 'Invalid parameters'
    })
  } else {
    let appid = process.env.appid
    let appSecret = process.env.appSecret
    let code = req.body.code
    let iv = req.body.iv
    let encryptedData = req.body.encryptedData
    axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`).then((resp) => {
      let session_key = resp.data.session_key
      let pc = new WXBizDataCrypt(appid, session_key)
      let data = pc.decryptData(encryptedData, iv)
      res.json({
        status: 200,
        data: data
      })
    }).catch((err) => {
      res.json({
        status: 1122,
        data: err
      })
    })
  }
});

/* Get Item details */

router.get('/item/info', (req, res, next) => {
  if (!req.body.url || !req.body.language) {
    res.json({
      status: 1001,
      message: 'Invalid parameters'
    })
  } else {
    let url = new URL(req.body.url)
    console.log(url)
    let itemId = url.searchParams.get('id')
    if (!itemId) {
      res.json({
        status: 1201,
        message: 'Invalid ID'
      })
    } else {
      let params = {
        instanceKey: process.env.INSTANCE_KEY,
        language: req.body.language,
        blockList: 'RootPath',
        itemId: itemId
      };
      axios.get(`http://otapi.net/service-json/BatchGetItemFullInfo?instanceKey=${params.instanceKey}&itemId=${params.itemId}&blockList=${params.blockList}&language=${params.language}`).then((resp) => {
        if (resp.data.ErrorCode == 'Ok') {
          res.json({
            status: 200,
            message: 'Item Found',
            data: resp.data.Result.Item
          })
        } else{
          res.json({
            status: resp.data.ErrorCode,
            message: resp.data.ErrorDescription
          })
        }
      }).catch((err) => {
        console.log('error => ', err)
        res.json(err)
      })
    }
  }
})


module.exports = router;

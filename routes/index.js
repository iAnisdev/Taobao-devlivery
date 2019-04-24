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
    let appid = 'wx7eb82154835d809d'
    let appKey = 'df362811ad98574e8ea39b1e55032389'
    let code = req.body.code
    let iv = req.body.iv
    let encryptedData = req.body.encryptedData
    axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appKey}&js_code=${code}&grant_type=authorization_code`).then((resp) => {
      let session_key = resp.data.session_key
      let pc = new WXBizDataCrypt(appid , session_key)
      let data = pc.decryptData(encryptedData , iv)
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

module.exports = router;

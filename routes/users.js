var express = require('express');
var router = express.Router();
var verifyToken = require('../middleware/verifyToken')
var verifyOpenId = require('../middleware/verifyOpenId')

/* Get ME */
router.get('/me' , verifyToken ,  (req , res, next) => {
  res.json(req.user)
})

module.exports = router;

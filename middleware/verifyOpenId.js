const userCollection = require('../models/orderModel')

const verifyOpenId = (req , res , next) => {
    if(!req.appId){
        res.json({
            status: 1001,
            message: 'Invalid Parameters'
        })
    }else{
        let appId = req.appId
        userCollection.findByOpenId(appId).then((user) => {
            if(!user){

            }else{
                req.user = user
            }
        })
    }
}
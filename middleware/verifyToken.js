const userCollection = require('../models/userModel')

const verifyToken = function(req , res , next) {
    if(!req.token){
        res.json({
            status: 1001,
            message: 'Invalid Parameters'
        })
    }else{
        let tok = req.token
        userCollection.findByToken(tok).then((user) => {
            if(!user){

            }else{
                req.user = user
            }
        })
    }
}

module.exports = verifyToken
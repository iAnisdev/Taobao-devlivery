const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    id: {
        required: true,
        unique: true,
        type: Number
    },
    createdOn: {
        required: true,
        type: Date,
        default: Date.now
    },
    nickName: {
        required: true,
        type: String
    },
    openid: {
        required: true,
        type: String,
        unique: true
    },
    avatarUrl: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    email: {
        type: String
    },
    gender: {
        type: String
    },
    country: {
        type: String
    },
    province: {
        type: String
    },
    city: {
        type: String
    },
    phone: {
        required: true,
        type: String,
        unique: true
    },
    isChanged: {
        required: true,
        type: Boolean,
        default: false
    },
    addList: [
        {
            address: {
                type: String
            },
            city: {
                type: String
            },
            phone: {
                type: String
            },
            state: {
                type: String
            },
            zipcode: {
                type: String
            },
            note: {
                type: String
            }
        }
    ],
    cart: {
        count: {
            required: true,
            type: Number
        },
        price: {
            required: true,
            type: Number
        },
        items: [
            {
                name: {
                    required: true,
                    type: String
                },
                img: {
                    required: true,
                    type: String
                },
                price: {
                    required: true,
                    type: Number
                },
                count: {
                    required: true,
                    type: Number
                },
                total: {
                    required: true,
                    type: Number
                }
            }
        ]
    },
    tokens: [{
        access: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true
        }
    }],
}, { collection: 'users' })

userSchema.statics.generateToken = function () {
    let user = this
    let userObj = {
        id: user.id,
        _id: user._id,
        openid: user.openid,
        phone: user.phone
    }
    let access = 'auth'
    let token = jwt.sign(userObj, 'A1B2C3D4')
    user.tokens.push({
        access,
        token
    }).then(() => {
        return token
    })
}

userSchema.methods.toJSON = function () {
    let user = this
    let userObj = user.toObject()
    return userObj
}

userSchema.statics.findByToken = function (tok) {
    let user = this
    var decode;
    try {
        decode = jwt.verify(tok , 'A1B2C3D4')
    } catch (e) {
        return Promise.reject(e)
    }
    return user.findOne({
        '_id': decode.id,
        'tokens.token': tok,
        'tokens.auth': 'auth'
    })
}

userSchema.statics.findByOpenId = function (id) {
    let user = this
    return user.findOne({
        openid: id
    })
}

const userModel = mongoose.model('user', userSchema)

module.exports = userModel
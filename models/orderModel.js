const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    id: {
        required: true,
        uniqe: true,
        type: Number
    },
    trackId: {
        required: true,
        uniqe: true,
        type: Number
    },
    createdOn: {
        required: true,
        type: Date,
        default: Date.now
    },
    delAddress: {
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
    },
    userId: {
        required: true,
    },
    orderBy:{
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true
        },
        _id: {
            required: true
        },
        avatarUrl: {
            type: String,
            required: true
        },
        openid: {
            type: String,
            required: true
        },
    },
    status: {
        required: true,
        type: String,
        default: 'inComing' //incoming , progress , indelivery , completed , cancelled
    },
    paid: {
        required: true,
        type: Number,
        default: 0, // 0 = not yet paid, 1 = paid
    },
    payId: {
        required: true,
        type: Number,
        default: 0, // 0 = not yet paid, else paymentId
    },
    paydetail: {
        type: String
    },
    items: [{
        id: {
            
        },
        name: {
            required: true,
            type: String,
        },
        qty: {
            required: true,
            type: Number,
        },
        price: {
            required: true,
            type: Number,
        },
        totalPrice: {
            required: true,
            type: Number,
        },
        img: {
            required: true,
            type: String,
        }
    }]
})

const orderModel = mongoose.model('order' , orderSchema)

module.exports = orderModel
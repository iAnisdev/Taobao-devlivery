const mongoose = require('mongoose')

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopping-cart'

module.exports= (() => {
    mongoose.connect(url , {useNewUrlParser: true})
    mongoose.set('useCreateIndex' , true)

    const db = mongoose.connection
    db.on('error' , console.error.bind(console , 'Connection Error'))
    db.once('open' , () => {
        console.log('Connected!')
    })
})()
const mongoose = require('mongoose')

const TransSchema = new mongoose.Schema({
    name: { type: String, required: 1 },
    price: {type: Number, required: 1 },
    description: { type: String, required: 1 },
    datetime: { type: Date, required: 1 }
})

const TransModel = mongoose.model('Transaction', TransSchema)
module.exports = TransModel
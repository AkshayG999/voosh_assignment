
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    sub_total: {
        type: Number,
    },
    phone_number: {
        type: Number
    }

}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema)

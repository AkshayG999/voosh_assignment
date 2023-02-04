const { default: mongoose, Schema } = require("mongoose");


const userSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        unique: true,
        required: true

    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model("user", userSchema)
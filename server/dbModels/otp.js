const mongoose = require("mongoose")

const Schema = mongoose.Schema

const OTP = new Schema({
    phone: {
        type: Number,
        required: true
    },
    otp: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("OTP", OTP)
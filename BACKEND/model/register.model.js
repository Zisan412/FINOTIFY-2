const mongoose = require("mongoose")

const RegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    since:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Register", RegisterSchema)
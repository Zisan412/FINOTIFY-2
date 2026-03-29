const mongoose = require("mongoose")

const UpiEntrySchema = new mongoose.Schema({
    amount:Number,
    bankName:String,
    category:String,
    type:String,
    date:Date,
    upiId:String,   
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Register"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("UpiEntry", UpiEntrySchema)
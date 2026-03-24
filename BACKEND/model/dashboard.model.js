const mongoose = require("mongoose")

const DashboardSchema = new mongoose.Schema({
    amount:Number,
    bankName:String,
    category:String,
    type:String,
    date:Date,
    desc:String,
    upiId:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Dashboard", DashboardSchema)

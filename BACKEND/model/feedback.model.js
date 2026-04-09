const mongoose = require("mongoose")

const FeedbackSchema = new mongoose.Schema({
    username: String,
    desc: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Feedback", FeedbackSchema)

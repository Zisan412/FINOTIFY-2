const mongoose = require("mongoose")

const dueSchema = new mongoose.Schema({
    type: String,
    name: String,
    amount: Number,
    note: String,
 date: { type: Date, default: Date.now },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Due", dueSchema)

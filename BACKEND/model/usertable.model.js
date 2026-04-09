const mongoose = require("mongoose");

const UserTableSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Register",
        required: true
    },
    oldName: String,
    newName: String,
    oldEmail: String,
    newEmail: String,
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("UserTable", UserTableSchema);

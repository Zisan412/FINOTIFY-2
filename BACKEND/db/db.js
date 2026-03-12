const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://user:musab2005@finotify.erxji0b.mongodb.net/?appName=FINOTIFY")
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;
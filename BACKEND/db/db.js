const mongoose = require("mongoose");

async function connectDB() {
        try{
       await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to database");}
        catch(err){
                console.log("their is error while connecting to database")
        }

};

module.exports = connectDB;
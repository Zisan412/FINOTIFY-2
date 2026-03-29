const mongoose = require("mongoose");

async function connectDB() {
        try{
       await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to database");}
        catch(err){
                console.log("There was an error while connecting to the database")
                console.log(err);
        }

};

module.exports = connectDB;
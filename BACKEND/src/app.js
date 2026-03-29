const express = require("express");
const connectDB = require("../db/db");
// const env = require("dotenv")
const cors = require("cors")
require("dotenv").config();
// env.config()

const register = require("../routes/user.route");
const app = express();
app.use(cors())



app.use(express.json());


console.log("JWT:", process.env.JWT_TOKEN);
console.log("MONGO:", process.env.MONGO_URI);
// app.use("/user",register)

// app.get("/", (req, res) => {
//   res.send("OK");
// });



module.exports = app;
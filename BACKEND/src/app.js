const express = require("express");
const connectDB = require("../db/db");
const env = require("dotenv")
const cors = require("cors")

env.config()

const register = require("../routes/user.route");
const app = express();
app.use(cors())



app.use(express.json());



app.use("/user",register)

app.get("/", (req, res) => {
  res.send("OK");
});



module.exports = app;
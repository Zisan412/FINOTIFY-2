const express = require("express");
const connectDB = require("../db/db");
const env = require("dotenv")
const cors = require("cors")
const desbordrouter = require("../routes/desbord.route")

env.config()

const register = require("../routes/user.route");
const app = express();
app.use(cors())

connectDB()


app.use(express.json());

app.use("/user",register)
app.use("/desbord",desbordrouter)


module.exports = app;
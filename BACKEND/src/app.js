const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("../db/db");
const register = require("../routes/user.route");

const app = express();
app.use(cors());
app.use(express.json());

connectDB(); // ✅ DB connect

app.use("/user", register); // ✅ Routes mount

console.log("JWT:", process.env.JWT_TOKEN);
console.log("MONGO:", process.env.MONGODB_URI);

module.exports = app;
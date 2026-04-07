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

module.exports = app;
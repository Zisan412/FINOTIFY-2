const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("../db/db");

const authRoutes      = require("../routes/auth.route");
const passwordRoutes  = require("../routes/password.route");
const dueRoutes       = require("../routes/due.route");
const dashboardRoutes = require("../routes/dashboard.route");
const smsRoutes       = require("../routes/sms.route");
const feedbackRoutes  = require("../routes/feedback.route");
const usertableRoutes = require("../routes/usertable.route");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/user", authRoutes);
app.use("/user", passwordRoutes);
app.use("/user", dueRoutes);
app.use("/user", dashboardRoutes);
app.use("/user", smsRoutes);
app.use("/user", feedbackRoutes);
app.use("/user", usertableRoutes);

module.exports = app;
const express = require("express");
const router = express.Router();
const Register = require("../model/register.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { name, phonenumber, email, password } = req.body;

    const finduser = await Register.findOne({ phonenumber });
    if (finduser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const user = await Register.create({ name, phonenumber, email, password: hashpassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);

    res.status(200).json({
      message: "User registered successfully",
      token,
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { phonenumber, password } = req.body;
    const finddata = await Register.findOne({ phonenumber });
    if (!finddata) {
      return res.status(400).json({ message: "Mobile number or password is not correct" });
    }
    const checklogin = await bcrypt.compare(password, finddata.password);
    if (!checklogin) {
      return res.status(400).json({ message: "Mobile number or password is not correct" });
    }
    const token = jwt.sign({ id: finddata._id }, process.env.JWT_TOKEN);
    res.status(200).json({
      message: "User login successfully",
      token,
      name: finddata.name,
      email: finddata.email,
      _id: finddata._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Register = require("../model/register.model");
const bcrypt = require("bcrypt");
const axios = require("axios");

let otpStore = null;

const createOtp = () => Math.floor(100000 + Math.random() * 900000);

router.post("/email", async (req, res) => {
  const { email } = req.body;
  const foundEmail = await Register.findOne({ email });
  if (!foundEmail) {
    return res.status(404).json({ message: "Email not found" });
  }
  otpStore = createOtp();
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { email: "finotify.in@gmail.com", name: "Finotify" },
        to: [{ email }],
        subject: "Reset Password OTP by Finotify",
        textContent: `Hey ${foundEmail.name},\n\nYour OTP is: ${otpStore}\n\nThank you for using Finotify`,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );
    res.status(200).json({ message: "Email sent successfully", data: foundEmail });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email" });
  }
});

router.post("/otp", async (req, res) => {
  const { otp } = req.body;
  if (otp == otpStore) {
    res.status(200).json({ message: "OTP is correct" });
  } else {
    res.status(400).json({ message: "OTP is incorrect" });
  }
});

router.post("/newpass/:email", async (req, res) => {
  const { email } = req.params;
  const { password } = req.body;
  const data = await Register.findOne({ email });
  if (!data) {
    return res.status(404).json({ message: "User not found" });
  }
  const hashpass = await bcrypt.hash(password, 10);
  await Register.findOneAndUpdate(
    { email },
    { $set: { password: hashpass } },
    { returnDocument: "after" },
  )
    .then(() => res.status(200).json({ message: "Password updated successfully" }))
    .catch(() => res.status(500).json({ message: "Failed to update password" }));
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Register = require("../model/register.model");
const Due = require("../model/due.model");
const bcrypt = require("bcrypt");
const Brevo = require("@getbrevo/brevo");
const Dashboard = require("../model/dashboard.model");
const UpiEntry = require("../model/upi-entry.model");
const axios = require("axios");
const jwt = require("jsonwebtoken");

// ── Auth Routes ──────────────────────────────────────────────

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

// ── OTP / Password Reset ─────────────────────────────────────

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

// ── Due Payment Routes ───────────────────────────────────────

router.post("/adddue", async (req, res) => {
  try {
    const { type, name, amount, note, date, user } = req.body;
    const due = await Due.create({ type, name, amount, note, date, user });
    res.status(200).json({ message: "Due created successfully", due });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/deletedue/:id", async (req, res) => {
  try {
    const due = await Due.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Due deleted successfully", due });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/getdue", async (req, res) => {
  const { user } = req.query;
  if (!user || user === "null" || user === "undefined") {
    return res.status(200).json({ message: "No user ID provided", due: [] });
  }
  const due = await Due.find({ user });
  res.status(200).json({ message: "Due fetched successfully", due });
});

// ── Dashboard Entry Routes ───────────────────────────────────

router.post("/adddashboardentry", async (req, res) => {
  try {
    const { amount, bankName, category, type, date, desc, upiId, user } = req.body;
    if (!user || user === "null" || user === "undefined") {
      return res.status(400).json({ message: "User ID is required to add entry" });
    }
    const dashboard = await Dashboard.create({
      amount: Number(amount),
      bankName,
      category,
      type,
      date: date || new Date(),
      desc,
      upiId,
      user,
    });
    res.status(200).json({ message: "Entry added successfully", dashboard });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/getdashboardentry", async (req, res) => {
  try {
    const { user } = req.query;
    if (!user || user === "null" || user === "undefined") {
      return res.status(200).json({ message: "No user ID provided", dashboard: [] });
    }
    const dashboard = await Dashboard.find({
      user,
      deletedByUser: { $ne: true },
    }).sort({ date: -1 });
    res.status(200).json({ message: "Entry fetched successfully", dashboard });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/updatedashboardentry/:id", async (req, res) => {
  try {
    const { amount, bankName, category, type, date, desc, upiId } = req.body;
    const updated = await Dashboard.findByIdAndUpdate(
      req.params.id,
      { $set: { amount: Number(amount), bankName, category, type, date, desc, upiId } },
      { returnDocument: "after" },
    );
    if (!updated) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json({ message: "Entry updated successfully", updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/deletedashboardentry/:id", async (req, res) => {
  try {
    const dashboard = await Dashboard.findByIdAndUpdate(
      req.params.id,
      { $set: { deletedByUser: true } },
      { returnDocument: "after" },
    );
    res.status(200).json({ message: "Entry deleted successfully", dashboard });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── SMS Parsing / UPI Auto-Detect ───────────────────────────

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
};

function parseSms(body, smsDate) {
  if (!body) return null;

  const sentMatch      = body.match(/Sent\s+Rs\.?([\d,]+\.?\d*)/i);
  const receivedMatch  = body.match(/Received\s+Rs\.?([\d,]+\.?\d*)/i);
  const debitMatch     = body.match(/Rs\.?([\d,]+\.?\d*)\s+debited/i);
  const creditMatch    = body.match(/Rs\.?([\d,]+\.?\d*)\s+credited/i);
  const inrMatch       = body.match(/INR\s+([\d,]+\.?\d*)/i);
  const sbiDebitMatch  = body.match(/debited\s+(?:by|with)\s+(?:Rs\.?)?([\d,]+\.?\d*)/i);
  const sbiCreditMatch = body.match(/credited\s+(?:by|with)\s+(?:Rs\.?)?([\d,]+\.?\d*)/i);
  const hdfcMatch      = body.match(/(?:debited|credited)\s+for\s+(?:Rs\.?|INR\s?)([\d,]+\.?\d*)/i);
  const inrCreditMatch = body.match(/INR\s+([\d,]+\.?\d*)\s+credited/i);
  const inrDebitMatch  = body.match(/INR\s+([\d,]+\.?\d*)\s+debited/i);
  const bobMatch       = body.match(/Rs\.?([\d,]+\.?\d*)\s+(?:has been\s+)?debited/i);

  const amountMatch = sentMatch || receivedMatch || debitMatch || creditMatch
    || inrCreditMatch || inrDebitMatch || sbiDebitMatch || sbiCreditMatch
    || hdfcMatch || inrMatch || bobMatch;

  if (!amountMatch) return null;

  const isUPI = body.match(/UPI|IMPS|debited|credited|Sent|Received/i);
  if (!isUPI) return null;

  const parsedDate = smsDate ? new Date(Number(smsDate)) : new Date();
  const bankMatch  = body.match(/(Kotak|HDFC|SBI|ICICI|Axis|PNB|BOB|Baroda|Yes\s?Bank|Paytm|IndusInd|Canara|Union|Federal|IDBI|UCO|Karnataka|Equitas)/i);
  const upiMatch   = body.match(/([a-zA-Z0-9.\-_]+@[a-zA-Z0-9]+)/);

  let type = "debit";
  if ((creditMatch || receivedMatch || inrCreditMatch || sbiCreditMatch)
    && !sentMatch && !debitMatch && !inrDebitMatch && !sbiDebitMatch) {
    type = "credit";
  }

  let category = "💵 Other";
  if (body.match(/zomato|swiggy|food|restaurant|cafe|blinkit/i))       category = "🍔 Food";
  else if (body.match(/uber|ola|rapido|petrol|fuel|irctc|train|bus/i)) category = "🧳 Travel";
  else if (body.match(/amazon|flipkart|myntra|meesho|shopping/i))      category = "🛍️ Shopping";
  else if (body.match(/rent|electricity|water|maintenance|house/i))    category = "🏠 House";
  else if (body.match(/salary|stipend/i) && type === "credit")         category = "💰 Salary";

  let desc = "UPI Transaction";
  if (upiMatch) {
    const handle = upiMatch[1].split("@")[0];
    const readable = handle.replace(/[.\-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();
    desc = `UPI • ${readable}`;
  } else if (bankMatch) {
    desc = `UPI • ${bankMatch[1]} Bank`;
  }

  return {
    amount: parseFloat(amountMatch[1]),
    type,
    bankName: bankMatch ? bankMatch[1] + " Bank" : "Unknown Bank",
    category,
    date: parsedDate,
    upiId: upiMatch ? upiMatch[1] : "",
    desc,
  };
}

router.post("/parse-sms", verifyToken, async (req, res) => {
  try {
    const { body, smsDate } = req.body;
    const parsed = parseSms(body, smsDate);
    if (!parsed) {
      return res.status(400).json({ error: "Not a UPI SMS" });
    }

    // Duplicate check: same amount + upiId on same day
    const startOfDay = new Date(parsed.date); startOfDay.setHours(0, 0, 0, 0);
    const endOfDay   = new Date(parsed.date); endOfDay.setHours(23, 59, 59, 999);

    const existing = await Dashboard.findOne({
      user:   req.user.id,
      amount: parsed.amount,
      upiId:  parsed.upiId,
      date:   { $gte: startOfDay, $lte: endOfDay },
    });

    if (existing) {
      if (existing.deletedByUser) {
        return res.status(200).json({ message: "Skipped (user deleted)", data: null });
      }
      return res.status(200).json({ message: "Already saved", data: existing });
    }

    const entry = new Dashboard({
      type:     parsed.type === "credit" ? "income" : "expense",
      date:     parsed.date,
      amount:   parsed.amount,
      category: parsed.category,
      bankName: parsed.bankName,
      upiId:    parsed.upiId,
      desc:     parsed.desc,
      user:     req.user.id,
    });

    await entry.save();
    res.status(201).json({ message: "Saved", data: entry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/entries", verifyToken, async (req, res) => {
  try {
    const entries = await UpiEntry.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ data: entries });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

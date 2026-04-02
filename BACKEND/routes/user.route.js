const express = require("express");
const router = express.Router();
const Register = require("../model/register.model");
const Due = require("../model/due.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const Dashboard = require("../model/dashboard.model");
const UpiEntry = require("../model/upi-entry.model");

console.log("USER ROUTE LOADED");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {
  console.log("REGISTER HIT");
  try {
    const { name, phonenumber, email, password } = req.body;

    const finduser = await Register.findOne({ phonenumber });

    if (finduser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = await Register.create({
      name,
      phonenumber,
      email,
      password: hashpassword,
    });

    let token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);

    console.log("TOKEN:", token);

    res.status(200).json({
      message: "User registered successfully",
      token: token,
      _id: user._id,
      email: user.email,
      name: user.name,
    });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});
router.post("/login", async (req, res) => {
  const { phonenumber, password } = req.body;
  const finddata = await Register.findOne({ phonenumber: phonenumber });
  if (!finddata) {
    return res
      .status(400)
      .json({ message: "Mobile number or password is not correct" });
  }
  console.log(finddata);
  const checklogin = await bcrypt.compare(password, finddata.password);
  if (!checklogin) {
    return res
      .status(400)
      .json({ message: "Mobile number or password is not correct" });
  }

  let token = jwt.sign({ id: finddata._id }, process.env.JWT_TOKEN);
  res
    .status(200)
    .json({
      message: "User login successfully",
      token: token,
      name: finddata.name,
      email: finddata.email,
      _id: finddata._id,
    });
  console.log(token);
});
let createotp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

let otphere = null;

router.post("/email", async (req, res) => {
  let { email } = req.body;
  console.log(email);

  const foundEmail = await Register.findOne({ email });
  if (!foundEmail) {
    console.log("Email not found");
    return res.status(404).json({ message: "Email not found" });
  }
  otphere = createotp();

  console.log("Email found, sending...");

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "finotify.in@gmail.com",
      pass: "vdvz fmmj nxci vhcm",
    },
  });

  let mailOptions = {
    from: "finotify.in@gmail.com",
    to: email, // ✅ plain string, not {email}
    subject: "Reset Password OTP by Finotify",
    text: `Hey ${foundEmail.name},
    
    Your OTP for password reset is: ${otphere}
    
    Thank you for using Finotify`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(500).send("Failed to send email");
    } else {
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .json({ message: "Email sent successfully", data: foundEmail });
    }
  });
});

router.post("/otp", async (req, res) => {
  let { otp } = req.body;
  console.log(otp, otphere);
  if (otp == otphere) {
    console.log("otp is correct");
    res.status(200).json({ message: "otp is correct" });
  } else {
    console.log("otp is incorrect");
    res.status(400).json({ message: "otp is incorrect" });
  }
});

router.post("/newpass/:email", async (req, res) => {
  let { email } = req.params;
  let { password } = req.body;
  const data = await Register.findOne({ email });
  if (!data) {
    console.log("user not found");
    return res.status(404).json({ message: "user not found" });
  }
  console.log(email, password);
  const hashpass = await bcrypt.hash(password, 10);
  let update = await Register.findOneAndUpdate(
    { email },
    { $set: { password: hashpass } },
    { new: true },
  )
    .then((update) => {
      console.log("password update successfully");
      res.status(200).json({ message: "password updated successfully" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "failed to update password" });
    });
});

//due logic

router.post("/adddue", async (req, res) => {
  const { type, name, amount, note, date, user } = await req.body;
  const due = await Due.create({ type, name, amount, note, date, user });

  res.status(200).json({ message: "due created successfully", due });
});
router.delete("/deletedue/:id", async (req, res) => {
  try {
    const due = await Due.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "due deleted successfully", due });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/getdue", async (req, res) => {
  const { user } = req.query;
  if (!user || user === 'null' || user === 'undefined') {
    return res.status(200).json({ message: "No user ID provided", due: [] });
  }

  const due = await Due.find({ user });
  res.status(200).json({ message: "due fetched successfully", due });
});

//main dashboard logic

router.post("/adddashboardentry", async (req, res) => {
  try {
    const { amount, bankName, category, type, date, desc, upiId, user } =
      req.body;

    if (!user || user === "null" || user === "undefined") {
      return res
        .status(400)
        .json({ message: "User ID is required to add entry" });
    }

    const entry = {
      amount: Number(amount),
      bankName,
      category,
      type,
      date: date || new Date(),
      desc,
      upiId,
      user,
    };

    const dashboard = await Dashboard.create(entry);
    res.status(200).json({ message: "Entry Added successfully", dashboard });
  } catch (err) {
    console.log("Error in adddashboardentry:", err.message);
    res.status(500).json({ message: err.message });
  }
});

router.get("/getdashboardentry", async (req, res) => {
  try {
    const { user } = req.query;
    if (!user || user === 'null' || user === 'undefined') {
      return res.status(200).json({ message: "No user ID provided", dashboard: [] });
    }

    const dashboard = await Dashboard.find({ user }).sort({ date: -1 });
    res.status(200).json({ message: "Entry fetched successfully", dashboard });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/updatedashboardentry/:id", async (req, res) => {
  try {
    const updated = await Dashboard.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json({ message: "Entry updated successfully", updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/deletedashboardentry/:id", async (req, res) => {
  try {
    const dashboard = await Dashboard.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: " Entry deleted successfully", dashboard });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//upi logic


const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    
    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = decoded;
        next();
    });
};

function parseSms(body, smsDate) {
  if (!body) return null;

  const sentMatch     = body.match(/Sent\s+Rs\.?([\d.]+)/i);
  const receivedMatch = body.match(/Received\s+Rs\.?([\d.]+)/i);
  const debitMatch    = body.match(/Rs\.?([\d.]+)\s+debited/i);
  const creditMatch   = body.match(/Rs\.?([\d.]+)\s+credited/i);
  const inrMatch      = body.match(/INR\s+([\d.]+)/i);
  const sbiMatch      = body.match(/debited\s+with\s+Rs\.?([\d.]+)/i);

  const amountMatch = sentMatch || receivedMatch || debitMatch || creditMatch || inrMatch || sbiMatch;
  if (!amountMatch) return null;

  const isUPI = body.match(/UPI|upi|IMPS|debited|credited|Sent|Received/i);
  if (!isUPI) return null;

  // ✅ Fix 1: smsDate use karo (frontend se aata hai — actual SMS timestamp)
  let parsedDate = smsDate ? new Date(Number(smsDate)) : new Date();

  const bankMatch = body.match(/(Kotak|HDFC|SBI|ICICI|Axis|PNB|BOB|Yes|Paytm|IndusInd|Canara|Union|Federal)/i);
  const upiMatch  = body.match(/([a-zA-Z0-9.\-_]+@[a-zA-Z0-9]+)/);

  let type = 'debit';
  if ((creditMatch || receivedMatch) && !sentMatch && !debitMatch) type = 'credit';

  // ✅ Fix 2: Category — same format as manual entries (emoji wali)
  let category = '📦 Other';
  if (body.match(/zomato|swiggy|food|restaurant|cafe|blinkit/i))        category = '🍔 Food';
  else if (body.match(/uber|ola|rapido|petrol|fuel|irctc|train|bus/i))  category = '✈️ Travel';
  else if (body.match(/amazon|flipkart|myntra|meesho|shopping/i))       category = '🛍️ Shopping';
  else if (body.match(/rent|electricity|water|maintenance|house/i))     category = '🏠 House';
  else if (body.match(/salary|stipend/i) && type === 'credit')          category = '💰 Salary';

  // ✅ Fix 3: Better description — UPI ID se readable name
  let desc = 'UPI Transaction';
  if (upiMatch) {
    const handle = upiMatch[1].split('@')[0];         // "kotak.food" from "kotak.food@kotak"
    const readable = handle
      .replace(/[.\-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())         // "Kotak Food"
      .trim();
    desc = `UPI • ${readable}`;
  } else if (bankMatch) {
    desc = `UPI • ${bankMatch[1]} Bank`;
  }

  return {
    amount:   parseFloat(amountMatch[1]),
    type,
    bankName: bankMatch ? bankMatch[1] + ' Bank' : 'Unknown Bank',
    category,
    date:     parsedDate,
    upiId:    upiMatch ? upiMatch[1] : '',
    desc,
  };
}
// POST /upi/parse-sms
router.post('/parse-sms', verifyToken, async (req, res) => {
  try {
    const { body, smsDate } = req.body;           // ✅ smsDate bhi lo
    const parsed = parseSms(body, smsDate);

    if (!parsed) {
      return res.status(400).json({ error: 'Not a UPI SMS' });
    }

    // ✅ Fix 4: Duplicate check — exact date match kaam nahi karta, same-day + amount + upiId use karo
    const startOfDay = new Date(parsed.date); startOfDay.setHours(0, 0, 0, 0);
    const endOfDay   = new Date(parsed.date); endOfDay.setHours(23, 59, 59, 999);

    const existing = await Dashboard.findOne({
      user:   req.user.id,
      amount: parsed.amount,
      upiId:  parsed.upiId,
      date:   { $gte: startOfDay, $lte: endOfDay },
    });

    if (existing) {
      return res.status(200).json({ message: 'Already saved', data: existing });
    }

    const entry = new Dashboard({
      type:     parsed.type === 'credit' ? 'income' : 'expense',
      date:     parsed.date,
      amount:   parsed.amount,
      category: parsed.category,
      bankName: parsed.bankName,
      upiId:    parsed.upiId,
      desc:     parsed.desc,           // ✅ Better desc
      user:     req.user.id,
    });

    await entry.save();
    res.status(201).json({ message: 'Saved', data: entry });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// GET /upi/entries — user ki saari UPI entries
router.get('/entries', verifyToken, async (req, res) => {
    try {
        const entries = await UpiEntry.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json({ data: entries });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




module.exports = router;

const express = require("express");
const router = express.Router();
const Dashboard = require("../model/dashboard.model");
const UpiEntry = require("../model/upi-entry.model");
const jwt = require("jsonwebtoken");

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
  const sbiDebitMatch  = body.match(/debited\s+(?:by|with)\s+(?:Rs\.?)?([\\d,]+\.?\d*)/i);
  const sbiCreditMatch = body.match(/credited\s+(?:by|with)\s+(?:Rs\.?)?([\\d,]+\.?\d*)/i);
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
    amount:   parseFloat(amountMatch[1]),
    type,
    bankName: bankMatch ? bankMatch[1] + " Bank" : "Unknown Bank",
    category,
    date:     parsedDate,
    upiId:    upiMatch ? upiMatch[1] : "",
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

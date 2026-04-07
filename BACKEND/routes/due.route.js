const express = require("express");
const router = express.Router();
const Due = require("../model/due.model");

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

module.exports = router;

const express = require("express");
const router = express.Router();
const Dashboard = require("../model/dashboard.model");

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

module.exports = router;

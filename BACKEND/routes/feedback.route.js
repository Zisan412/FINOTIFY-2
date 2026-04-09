const express = require("express");
const router = express.Router();
const Feedback = require("../model/feedback.model");

// Add Feedback Route
router.post("/feedback/add", async (req, res) => {
    try {
        const { username, desc } = req.body;

        if (!username || !desc) {
            return res.status(400).json({ success: false, message: "Username and description are required" });
        }

        const newFeedback = new Feedback({
            username,
            desc
        });

        await newFeedback.save();

        res.status(201).json({ success: true, message: "Feedback submitted successfully" });
    } catch (error) {
        console.error("Error saving feedback:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Fetch all Feedbacks Route (optional, for admin view later)
router.get("/feedback/all", async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ date: -1 });
        res.status(200).json({ success: true, feedbacks });
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const Register = require("../model/register.model");
const UserTable = require("../model/usertable.model");

// API Endpoint to update profile (updates Register + logs in UserTable)
router.put("/usertable/update-profile", async (req, res) => {
    try {
        const { userId, newName, newEmail } = req.body;

        if (!userId || !newName || !newEmail) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Find existing user carefully
        const user = await Register.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const oldName = user.name;
        const oldEmail = user.email;

        // If nothing changed, just return success
        if (oldName === newName && oldEmail === newEmail) {
            return res.status(200).json({ success: true, message: "No data changed." });
        }

        // Proceed to update Register table
        user.name = newName;
        user.email = newEmail;
        await user.save(); // Automatically saves to db

        // Add history log securely in 'usertable'
        const logEntry = new UserTable({
            userId,
            oldName,
            newName,
            oldEmail,
            newEmail
        });
        await logEntry.save();

        res.status(200).json({ 
            success: true, 
            message: "Profile updated and history logged in usertable successfully" 
        });

    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ success: false, message: error.message || "Server error occurred" });
    }
});

// Optional route: Get update history of a user
router.get("/usertable/history/:userId", async (req, res) => {
    try {
        const history = await UserTable.find({ userId: req.params.userId }).sort({ updatedAt: -1 });
        res.status(200).json({ success: true, count: history.length, data: history });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;

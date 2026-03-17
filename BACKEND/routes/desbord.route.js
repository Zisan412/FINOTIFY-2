const express = require("express");
const desbordrouter = express.Router();
const Register = require("../model/register.model");

desbordrouter.get("/desbord/:storetoken", async (req, res) => {
  
  try {
    const data = await Register.findById(req.params.storetoken);

    if (!data) {
      return res.status(404).json({ message: "Record not found" });
      
    }

    res.status(200).json({ message: "Data fetched successfully", data });
    console.log(data);

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = desbordrouter;
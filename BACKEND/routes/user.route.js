const express = require("express");
const router = express.Router();
const Register = require("../model/register.model");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const { name, phonenumber, email, password } = req.body;
    
    const finduser = await Register.findOne({ phonenumber });

    if (finduser) {
        return res.send("User already exists");

    }
    const hashpassword = await bcrypt.hash(password, 10);
    const user = await Register.create({ name, phonenumber, email, password:hashpassword   });
    console.log(name, phonenumber, email, hashpassword);
    // res.send("User registered successfully");
    let token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
    res.status(200).json({ message: "User registered successfully", token: token });
    console.log(token);
})

router.post('/login',async (req,res)=>{
    const {phonenumber,password}=req.body
    const finddata= await Register.findOne({phonenumber})
    console.log(finddata)
     const checklogin= await bcrypt.compare(password,finddata.password)
    if(!checklogin){
       return res.send('usename and password is not corrt')
    }
     let token = jwt.sign({ id: finddata._id }, process.env.JWT_TOKEN);
    res.status(200).json({ message: "User login successfully", token: token });
    console.log(token);


})

module.exports = router;
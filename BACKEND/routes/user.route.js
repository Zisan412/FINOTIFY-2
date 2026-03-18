const express = require("express");
const router = express.Router();
const Register = require("../model/register.model");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const { name, phonenumber, email, password } = req.body;
    
    const finduser = await Register.findOne({ phonenumber });

    if (finduser) {
        return res.status(400).json({ message: "User already exists" });

    }
    const hashpassword = await bcrypt.hash(password, 10);
    const user = await Register.create({ name, phonenumber, email, password:hashpassword   });
    console.log(name, phonenumber, email, hashpassword);
    // res.send("User registered successfully");
    let token = jwt.sign({ id: user._id }, "mysecretkey");
    res.status(200).json({ message: "User registered successfully", token: token, id: user._id, email: user.email, name: user.name });
    console.log(token);
})

router.post('/login',async (req,res)=>{
    const {phonenumber,password}=req.body
    const finddata= await Register.findOne({phonenumber:phonenumber})
      if(!finddata){
        return res.status(400).json({message:'username and password is not correct'})
    }
    console.log(finddata)
     const checklogin= await bcrypt.compare(password,finddata.password)
    if(!checklogin){
        return res.status(400).json({message:'username and password is not correct'})
    }
   
     let token = jwt.sign({ id: finddata._id },"MYSECRETKEY");
    res.status(200).json({ message: "User login successfully", token: token ,name: finddata.name, email: finddata.email}); 
    console.log(token);


})
let createotp=()=>{
    return Math.floor(100000 + Math.random() * 900000)
}

let otphere=null

router.post('/email', async (req, res) => {
  let { email } = req.body;
    console.log(email)    

  const chekemail = await Register.findOne({ email });
  if (!chekemail) {
   console.log('Email not found');
   return res.status(404).json({ message: 'Email not found' });
  }
    otphere=createotp()

  console.log('Email found, sending...');

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:"musabmomin234@gmail.com",
      pass:'tnzd lskx phya oiub'
    }
  });

  let mailOptions = {
    from: 'musabmomin234@gmail.com',
    to: email,                          // ✅ plain string, not {email}
    subject: 'provide a otp for reset password by finotify app',
    text: 'Your OTP for password reset is: ' + otphere
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
      return res.status(500).send('Failed to send email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Email sent successfully',data:chekemail });   
    }
  });

});

router.post('/otp',async(req,res)=>{
    let {otp}=req.body
    console.log(otp,otphere)
    if(otp==otphere)
    {
        console.log('otp is correct')
        res.status(200).json({message:'otp is correct'})
    }
    else{
        console.log('otp is incorrect')
        res.status(400).json({message:'otp is incorrect'})
    }
})

router.post('/newpass/:email',async(req,res)=>{

    let {email}=req.params
    let {password}=req.body
    const data=await Register.findOne({email})
    if(!data)
    {
        console.log('user not found')
        return res.status(404).json({message:'user not found'})
    }
    console.log(email
        ,password)
    const hashpass=await bcrypt.hash(password,10)    
    let update= await Register.findOneAndUpdate({email}, {$set: {password: hashpass}}, {new: true})
    .then((update)=>{
        console.log('password update successfully')
        res.status(200).json({message:'password updated successfully'})
    }).catch((error)=>{
        console.log(error)
        res.status(500).json({message:'failed to update password'})
    })
})
module.exports = router;
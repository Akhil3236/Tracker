import nodemailer from "nodemailer"; 
import dotenv from "dotenv";
import { User } from "../models/user/usermodel.js";
import fs from "fs";
import path from "path";

dotenv.config();

// Read the login template
const loginTemplate = path.join(process.cwd(), 'login.txt');
const template_login = fs.readFileSync(loginTemplate, 'utf8');


// Read the otp template
const otpTemplate = path.join(process.cwd(),'otp.txt');
const template_otp = fs.readFileSync(otpTemplate, 'utf8');
/*---------------------------------------------------------
       welcome mail set-up
-----------------------------------------------------------*/

export const welcome=async(req,res)=>{

  const {to}=req.body;

  try {
    // Get user details for personalization
    const user = await User.findOne({email: to});
    const userName = user ? user.name : 'User';
    const timestamp = new Date().toLocaleString();

    // Replace placeholders in template
    let emailContent = template_login
      .replace('{{name}}', userName)
      .replace('{{timestamp}}', timestamp);

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: `${process.env.SENDER_EMAIL}`, // correct email
        pass: `${process.env.SENDER_PASSWORD}`  //enter the 16 digit passsword

      }
    });

    await transporter.sendMail({
      from: `${process.env.SENDER_EMAIL}`, //ender the prvider mail the emila should be same as the user
      to,
      subject:"Login detected(Fit-Fuel)",
      text: emailContent
    });

    res.json({ success: true, message: "login mail has been sent" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
  

}
/*---------------------------------------------------------
       reset  password email set-up
-----------------------------------------------------------*/
export const send_mail = async (req, res) => {
    const  {to} = req.body;
  
    try {
      
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: `${process.env.SENDER_EMAIL}`, // correct email
          pass: `${process.env.SENDER_PASSWORD}`  //enter the 16 digit passsword

        }
      });
  
      await transporter.sendMail({
        from: `${process.env.SENDER_EMAIL}`, //ender the prvider mail the emila should be same as the user
        to,
        subject:"update regarding password (Fit-Fuel)",
        text:"your password has been successfully changed "
      });
  
      res.json({ success: true, message: "Email sent successfully" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };
  
/*---------------------------------------------------------
       otp for -- password  set-up
-----------------------------------------------------------*/ 

const otpStore={};
export const reset=async(req,res)=>{

    const {to}=req.body;
   
    const email=to;
    const verifyto=await User.findOne({email});
    const user = await User.findOne({email: to});
    const userName = user ? user.name : 'User';
    const timestamp = new Date().toLocaleString();

    // Replace placeholders in template
    
    if(verifyto===null){
      
      console.log("user not found !!");
      res.status(400).json({
        message:"user not found !"
      })
      return;
      
    }
    const otp=Math.floor(1000+Math.random()*9000).toString();
    otpStore[to] = { otp, expires: Date.now() + 5 * 60 * 1000 };
    
    let emailContent = template_otp
      .replace('{{NAME}}', userName)
      .replace('{{otp}}', otp);

    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: `${process.env.SENDER_EMAIL}`, // correct email
          pass: `${process.env.SENDER_PASSWORD}`  //enter the 16 digit passsword

        }
      });
  
      await transporter.sendMail({
        from: `${process.env.SENDER_EMAIL}`, //ender the prvider mail the emila should be same as the user
        to,
        subject:"one-time password(Fit-Fuel)",
        text:`${emailContent}`
      });
  
      res.json({ success: true, message: "Email sent successfully" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
}

/*---------------------------------------------------------
       otp verification for -- password  set-up
-----------------------------------------------------------*/ 

export const  otp=async(req, res)=> {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { to, otp } = req.body;

  if (!otpStore[to]) return res.status(400).json({ message: 'No OTP found' });

  const { otp: savedOtp, expires } = otpStore[to];

  if (Date.now() > expires) {
    delete otpStore[to];
    return res.status(400).json({ message: 'OTP expired' });
  }

  if (otp !== savedOtp) return res.status(400).json({ message: 'Invalid OTP' });

  delete otpStore[to]; // Remove OTP after successful verification
  res.status(200).json({ message: 'OTP verified successfully' });

}

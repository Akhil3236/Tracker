import nodemailer from "nodemailer"; 
import dotenv from "dotenv";
import { User } from "../models/user/usermodel.js";


dotenv.config();

/*---------------------------------------------------------
       reset  password email set-up
-----------------------------------------------------------*/
export const send_mail = async (req, res) => {
    const  {to} = req.body;

    console.log(to);
  
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
        text:"your password has been sucessfully changed "
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
    
    if(verifyto===null){

    console.log("user not found !!");
    res.status(400).json({
      message:"user not found !"
    })
    return;
     
    }
    const otp=Math.floor(1000+Math.random()*9000).toString();
    otpStore[to] = { otp, expires: Date.now() + 5 * 60 * 1000 };
    
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
        text:`your OTP is ${otp}`
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

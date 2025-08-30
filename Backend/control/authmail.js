import nodemailer from "nodemailer"; 
import dotenv from "dotenv";


dotenv.config();

/*---------------------------------------------------------
       forgot password email set-up
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
        subject:"looks goods",
        text:"sample for test"
      });
  
      res.json({ success: true, message: "Email sent successfully" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };
  
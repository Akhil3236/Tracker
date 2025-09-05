const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  // Configure SMTP transporter (using Gmail App Password)
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "akhiltuluri123@gmail.com", // Gmail address
      pass: "zogy brzq lzfs mwyd", // App password
    },
  });

  // Mail options
  let mailOptions = {
    from: "akhiltuluri123@gmail.com",   // sender
    to: "akhiltuluri123@gmail.com",     // your inbox (so YOU receive)
    subject: "New Form Submission",
    text: `Name: ${body.name}\nEmail: ${body.email}\nMessage: ${body.message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, message: "Email sent!" }),
    };
  } catch (error) {
    console.error("Mail Error:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};

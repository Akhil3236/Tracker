const nodemailer = require("nodemailer");
const packageName = require('packageName');

exports.handler = async (event) => {
  console.log("Event Body:", event.body);

  let body;
  try {
    body = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, error: "Invalid request body" }),
    };
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "This email is for testing",
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

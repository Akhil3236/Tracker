const nodemailer = require("nodemailer");
const twilio = require("twilio");

// Initialize Twilio client with environment variables
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

exports.handler = async (event) => {
  console.log("Full event:", JSON.stringify(event, null, 2));

  const path = event.path || event.requestContext?.http?.path;
  const body = JSON.parse(event.body);

  if (!path) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, error: "Path not found in event" }),
    };
  }

  // Handle send-email endpoint
  if (path.endsWith("/send-email")) {
    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: body.to,
        subject:"Test Email from Lambda",
        text: body.message,
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: "Email sent!" }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: error.message }),
      };
    }
  }

  // Handle send-message endpoint
  if (path.endsWith("/send-whatsapp")) {
    try {
      await twilioClient.messages.create({
        from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
        to: `whatsapp:${body.to}`,
        body: body.message,
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: "WhatsApp message sent!" }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, error: error.message }),
      };
    }
  }

  // If path is not matched
  return {
    statusCode: 404,
    body: JSON.stringify({ success: false, error: "Invalid endpoint" }),
  };
};

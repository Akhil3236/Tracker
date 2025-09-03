exports.handler = async (event) => {
  try {
    console.log("Event:", JSON.stringify(event));

    const route = event.rawPath;  // correct way to get route
    const body = event.body ? JSON.parse(event.body) : {};

    if (route === "/send-email") {
      const { to, subject, message } = body;
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: `Email sent to ${to} with subject "${subject}"`,
        }),
      };
    }

    if (route === "/send-whatsapp") {
      const { to, message } = body;
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: true,
          message: `WhatsApp sent to ${to} with message "${message}"`,
        }),
      };
    }

    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Route not found" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

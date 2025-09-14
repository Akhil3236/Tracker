export const handler = async (event) => {
    try {
      console.log("SQS Event received:", JSON.stringify(event, null, 2));
  
      // Loop through messages
      for (const record of event.Records) {
        const body = JSON.parse(record.body);
        console.log("Message Body:", body);
      }
  
      return { statusCode: 200, body: "Messages logged successfully" };
    } catch (error) {
      console.error("Error in Lambda:", error);
      return { statusCode: 500, body: JSON.stringify(error) };
    }
  };
  
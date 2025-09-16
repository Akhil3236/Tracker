// index.mjs
import { MongoClient,ObjectId } from 'mongodb';

// Use environment variables
const uri = process.env.MONGODB_URL;

let cachedClient = null;

async function connectToMongo() {
    if (cachedClient && cachedClient.isConnected && cachedClient.isConnected()) {
        return cachedClient;
    }
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    await client.connect();
    cachedClient = client;
    console.log("Connected to MongoDB");
    return client;
}

export async function handler(event) {
    try {
        const client = await connectToMongo();
        const db = client.db("test");
        const collection = db.collection("orders");
        const cartCollection = db.collection("carts");


        console.log("the event is =>>>>>>>>>> ",event);

        console.log(JSON.stringify(event, null, 2));

        for (const record of event.Records) {
            const body = JSON.parse(record.body);
            const userId = body.userId;

            console.log("Processing userId:", userId);

            // Assuming 'collection' is already defined and connected
            const order = await collection.findOne({ userId:new ObjectId(userId)});
            
            //change the order status to processing later and delete the cart
            if (order) {
                await collection.updateOne(
                    { _id: order._id },
                    { $set: { status: "Processing" } }
                );

                await cartCollection.deleteOne({ userId: new ObjectId(userId) });
                await cartCollection.deleteOne({ userId: userId });


    
                console.log("Order status updated to Processing");
                console.log("cart of the user has been deleted");
                
                console.log("Orders for userId:", userId, order);
                
            } else {
                console.log("Order not found for userId:", userId);
            }

        }
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Orders fetched successfully",
            })
        };
    } catch (error) {
        console.error("Error fetching orders:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Failed to fetch orders",
                error: error.message
            })
        };
    }
}

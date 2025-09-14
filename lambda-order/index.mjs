// index.mjs
import { MongoClient } from 'mongodb';

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

        const orders = await collection.find({}).toArray();
        
        console.log(orders);
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Orders fetched successfully",
                data: orders
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

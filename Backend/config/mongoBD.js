import mongoose from 'mongoose';
import dns from 'dns';


export const connectDB = async () => {
    
    try {
        dns.setServers(['8.8.8.8', '1.1.1.1']);
    } catch {}

    await mongoose.connect(`${process.env.MONGODB_URL}`);
    mongoose.connection.on('connected', () => console.log('Database Connected'));
};



import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();
const url = process.env.MONGO_URL;
export const connectDB = () => {
    try {
        mongoose.connect(url)
        console.log('MongoDB connected');
    } catch (error) {
        console.log('Error:', error.message);
    }
}


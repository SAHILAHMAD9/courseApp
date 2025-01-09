require('dotenv').config(); // Load environment variables from .env

const mongoose = require('mongoose');

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
// console.log(username,password);

const dbURI = `mongodb+srv://captainshaheenbagh:${password}@cluster0.kykqq.mongodb.net/CA?retryWrites=true&w=majority&appName=Cluster0`;


const connectDB = async () => {
    try {
        await mongoose.connect(dbURI,{ dbName: "courses" });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = { mongoose, connectDB };
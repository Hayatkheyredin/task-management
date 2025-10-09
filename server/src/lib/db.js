import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/task-management";
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

const disconnectDB = async () => {connectDB
  await mongoose.disconnect();
  console.log("✅ MongoDB disconnected successfully!");
};

export { connectDB, disconnectDB };

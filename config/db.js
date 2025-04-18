import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to mongodb ${mongoose.connection.host}`)
  } catch (error) {
    console.error(`MongoDB ${error}`);
  }
};

export default connectDB;

import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database successfully");
  } catch (error) {
    console.log("Error in connecting to Database", error);
    process.exit(1);
  }
}
export default connectDB;

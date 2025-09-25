import mongoose from "mongoose";

export default async function connectToMongoDB(MONGO_URL) {
  try {
    await mongoose.connect(MONGO_URL); // no options needed in v7+
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Error connecting to MongoDB:", err);
  }
}

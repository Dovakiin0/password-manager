import mongoose from "mongoose";

export default async function ConnectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to Database Successfully");
  } catch (err) {
    console.error(err);
  }
}

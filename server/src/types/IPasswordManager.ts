import mongoose from "mongoose";

export interface IPasswordManager extends mongoose.Document {
  websiteUri: string;
  username: string;
  password: string;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

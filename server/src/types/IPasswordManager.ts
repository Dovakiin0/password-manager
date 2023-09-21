import mongoose from "mongoose";

export interface IPasswordManager extends mongoose.Document {
  websiteUri: string;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

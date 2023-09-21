import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

export type OmitedUser = Omit<IUser, "password">;

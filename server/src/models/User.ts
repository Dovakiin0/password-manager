import mongoose from "mongoose";
import { IUser } from "../types/IUser";
import { comparePwd, hashPassword } from "../helper/jwt";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

// Custom function that hashes the user password before user data save
UserSchema.pre("save", async function(next) {
  const user = this as IUser;
  if (!user.isModified("password")) return next();
  user.password = hashPassword(user.password);
  return next();
});

// Custom function that compares the hashed password of a user
UserSchema.methods.comparePassword = async function(password: string) {
  const user = this as IUser;
  return comparePwd(password, user.password);
};

const User = mongoose.model<IUser>("User", UserSchema);

export default User;

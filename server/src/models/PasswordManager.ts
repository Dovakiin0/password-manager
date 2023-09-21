import mongoose from "mongoose";
import { comparePwd, hashPassword } from "../helper/jwt";
import { IPasswordManager } from "../types/IPasswordManager";

const PasswordManagerScheme = new mongoose.Schema(
  {
    websiteUri: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  },
);

const PasswordManager = mongoose.model<IPasswordManager>(
  "PasswordManager",
  PasswordManagerScheme,
);

export default PasswordManager;

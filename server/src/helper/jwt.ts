import jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { IJWT } from "../types/IJWT";

export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

export const generateJWT = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

export const verifyJWT = (token: string): IJWT | null => {
  try {
    let decode = jwt.verify(token, process.env.JWT_SECRET as string) as IJWT;
    return decode;
  } catch (error) {
    return null;
  }
};

export const comparePwd = (password: string, hashPwd: string): boolean => {
  return bcrypt.compareSync(password, hashPwd);
};

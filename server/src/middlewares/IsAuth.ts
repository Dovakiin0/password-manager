import type { Response, NextFunction } from "express";
import { verifyJWT } from "../helper/jwt";
import User from "../models/User";
import { IRequest } from "../types/IRequest";

export const isAuth = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token = req.cookies["access_token"];
    if (typeof token === "undefined") {
      next();
      return;
    }
    const decoded = verifyJWT(token);

    if (decoded === null) {
      next();
      return;
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("Not Authorized");
    }

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};

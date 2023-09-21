import type { Response } from "express";
import User from "../models/User";
import asyncHandler from "express-async-handler";
import { generateJWT } from "../helper/jwt";
import { IRequest } from "../types/IRequest";

/* 
 @Desc Get current logged in user
 @Route /api/auth/@me
 @Method GET
 */
const getMe = asyncHandler(async (req: IRequest, res: Response) => {
  res.status(200).json(req.user);
});

/* 
 @Desc Login 
 @Route /api/auth/
 @Method POST
 */
const login = asyncHandler(async (req: IRequest, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    // if no user found
    res.status(401);
    throw new Error("Username or password is incorrect");
  }

  if (await user.comparePassword(password)) {
    const expireDate = 7 * 24 * 60 * 60 * 1000; // 7 days

    res
      .status(200)
      .cookie("access_token", generateJWT(user._id), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + expireDate),
      })
      .json({
        user: {
          id: user._id,
          username: user.username,
        },
      });
  } else {
    res.status(401);
    throw new Error("Username or password incorrect");
  }
});

/* 
  @Desc Register new User
  @Route /api/auth/register
  @Method POST
*/
const registerUser = asyncHandler(async (req: IRequest, res: Response) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(409);
    throw new Error("User already exists");
  }

  const user = new User({
    username,
    password,
  });

  await user.save();

  const expireDate = 7 * 24 * 60 * 60 * 1000; // 7 days
  res
    .status(200)
    .cookie("access_token", generateJWT(user._id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + expireDate),
    })
    .json({
      user: {
        id: user._id,
        username: user.username,
      },
    });
});

/* 
  @Desc Clears the cookie and logs out the user
  @Route /api/auth/logout
  @Method POST
*/
const logout = asyncHandler(async (req: IRequest, res: Response) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "Logged out successfully" });
});

export { registerUser, login, logout, getMe };

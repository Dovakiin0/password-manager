import type { Response } from "express";
import PasswordManager from "../models/PasswordManager";
import asyncHandler from "express-async-handler";
import { IRequest } from "../types/IRequest";

/* 
 @Desc Get all saved passwords from user
 @Route /api/passwords
 @Method GET
 */
const getAll = asyncHandler(async (req: IRequest, res: Response) => {
  const passwordManager = await PasswordManager.find();
  res.status(200).json(passwordManager);
});

/* 
 @Desc Create new password for a user 
 @Route /api/passwords
 @Method POST
 */
const create = asyncHandler(async (req: IRequest, res: Response) => {
  const { username, websiteUri, password } = req.body;
  const passwordManager = new PasswordManager({
    username,
    websiteUri,
    password,
  });

  await passwordManager.save();
  res.status(201).json(passwordManager);
});

/* 
 @Desc Update an existing password of user
 @Route /api/passwords
 @Method PUT
 */
const update = asyncHandler(async (req: IRequest, res: Response) => {
  const { username, websiteUri, password } = req.body;
  const passwordManager = await PasswordManager.findByIdAndUpdate(
    req.params.id,
    {
      username,
      websiteUri,
      password,
    },
    { new: true },
  );
  res.status(200).json(passwordManager);
});

/* 
 @Desc Delete an existing password
 @Route /api/passwords
 @Method DELETE
 */
const deletePassword = asyncHandler(async (req: IRequest, res: Response) => {
  await PasswordManager.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true });
});

export { getAll, create, update, deletePassword };

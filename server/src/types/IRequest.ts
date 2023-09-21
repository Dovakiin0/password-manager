import { Request } from "express";
import { OmitedUser } from "./IUser";

export interface IRequest extends Request {
  user?: OmitedUser;
}

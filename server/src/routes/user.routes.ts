import { Router } from "express";
import {
  getMe,
  login,
  logout,
  registerUser,
} from "../controller/user.controller";
import { isAuth } from "../middlewares/IsAuth";

const router = Router();

router.get("/@me", isAuth, getMe);
router.post("/", login);
router.post("/register", registerUser);
router.post("/logout", isAuth, logout);

export default router;

import { Router } from "express";
import {
  getAll,
  create,
  update,
  deletePassword,
} from "../controller/passwordManager.controller";

const router = Router();

router.get("/", getAll);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deletePassword);

export default router;

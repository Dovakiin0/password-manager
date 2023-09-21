import { Router } from "express";
import {
  getAll,
  create,
  update,
  deletePassword,
} from "../controller/passwordManager.controller";

const router = Router();

router.get("/passwords", getAll);
router.post("/passwords", create);
router.put("/passwords/:id", update);
router.delete("/passwords/:id", deletePassword);

export default router;

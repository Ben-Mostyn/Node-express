import { Router } from "express";
import {
  createDailyLog,
  deleteDailyLog,
  getAllDailyLogs,
  getDailyLog,
  updateDailyLog,
} from "../controllers/dailyLog.controller.js";

const router = Router();

router.get("/:date", getDailyLog);
router.get("/", getAllDailyLogs);
router.post("/", createDailyLog);
router.put("/:id", updateDailyLog);
router.delete("/:id", deleteDailyLog);

export default router;

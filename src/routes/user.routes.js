import { Router } from "express";
import {
  createUser,
  getUserByDetails,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/login", getUserByDetails);

router.post("/create", createUser);

export default router;

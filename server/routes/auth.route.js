import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  refreshToken,
} from "../controller/auth.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

authRouter.post("/logout", logoutUser);

authRouter.post("/refresh-token", refreshToken);

authRouter.get("/me", protect, getMe);

export default authRouter;

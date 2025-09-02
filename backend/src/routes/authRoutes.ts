import {
  getMe,
  loginRequest,
  loginVerify,
  signupRequest,
  signupVerify,
} from "@/controllers/authController";
import { requireAuth } from "@/middlewares/authMiddleware";
import { validate } from "@/middlewares/validate";
import {
  loginSchema,
  loginVerifySchema,
  signupSchema,
  signupVerifySchema,
} from "@/zodSchema/authSchema";
import { Router, type Router as ExpressRouter } from "express";

const authRoutes: ExpressRouter = Router();

// Signup
authRoutes.post("/signup/request", validate(signupSchema), signupRequest);
authRoutes.post("/signup/verify", validate(signupVerifySchema), signupVerify);

// Login
authRoutes.post("/login/request", validate(loginSchema), loginRequest);
authRoutes.post("/login/verify", validate(loginVerifySchema), loginVerify);

authRoutes.get("/me", requireAuth, getMe);

export default authRoutes;

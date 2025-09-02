import {
  getMe,
  loginRequest,
  loginVerify,
  logout,
  signupRequest,
  signupVerify,
} from "@/controllers/authController/authController";
import { googleCallback } from "@/controllers/authController/oauthController";
import { requireAuth } from "@/middlewares/authMiddleware";
import { validate } from "@/middlewares/validate";
import {
  loginSchema,
  loginVerifySchema,
  signupSchema,
  signupVerifySchema,
} from "@/zodSchema/authSchema";
import { Router, type Router as ExpressRouter } from "express";
import passport from "passport";

const authRoutes: ExpressRouter = Router();

// Google login route
authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Google authentication callback
authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/auth/login`,
  }),
  googleCallback
);

// Signup
authRoutes.post("/signup/request", validate(signupSchema), signupRequest);
authRoutes.post("/signup/verify", validate(signupVerifySchema), signupVerify);

// Login
authRoutes.post("/login/request", validate(loginSchema), loginRequest);
authRoutes.post("/login/verify", validate(loginVerifySchema), loginVerify);

authRoutes.get("/me", requireAuth, getMe);
authRoutes.post("/logout", logout);

export default authRoutes;

import { signJwt } from "@/utils/jwt"; // Assuming this is a utility to sign JWTs
import { Request, Response } from "express";

// Google authentication callback
export const googleCallback = (req: Request, res: Response) => {
  // req.user is the Prisma user returned from strategy
  const user = req.user as any;
  if (!user) {
    return res.redirect(
      `${process.env.FRONTEND_URL}/auth/login?error=google_failed`
    );
  }
  const token = signJwt(user);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
};

// You can add more controller methods as needed, e.g., loginRequest, signupRequest, etc.

import { ApiError } from "@/middlewares/errorHandler";
import {
  LoginSchemaT,
  LoginVerifySchemaT,
  SignupSchemaT,
  SignupVerifySchemaT,
} from "@/zodSchema/authSchema";
import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import {
  createCredentialUser,
  findUserByEmail,
  generateAndSendOtp,
  issueJwtForUser,
  verifyOtpAndConsume,
} from "../../services/authService";

export async function signupRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = res.locals.validated as SignupSchemaT;
    const email = body.email.toLowerCase();

    const existing = await findUserByEmail(email);
    if (existing) throw new ApiError("User already exists, please login", 400);

    await generateAndSendOtp(email);
    return res.json({ ok: true, message: "OTP sent for signup" });
  } catch (err) {
    return next(err);
  }
}

export async function signupVerify(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = res.locals.validated as SignupVerifySchemaT;
    const email = body.email.toLowerCase();

    const existing = await findUserByEmail(email);
    if (existing)
      throw new ApiError(
        "User already exists, please login",
        400
        // "user_exists"
      );

    await verifyOtpAndConsume(email, body.code);

    // create user
    const dob = new Date(body.dob);
    const user = await createCredentialUser({ email, name: body.name, dob });

    // issue token
    const token = issueJwtForUser(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    const data = {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        dob: user.dob ? user.dob.toISOString() : undefined,
        provider: user.provider,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
    };
    return res.json(data);
  } catch (err) {
    return next(err);
  }
}

export async function loginRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = res.locals.validated as LoginSchemaT;
    const email = body.email.toLowerCase();

    const existing = await findUserByEmail(email);
    if (!existing)
      throw new ApiError(
        "User not found. Please sign up first",
        404,
        "user_not_found"
      );

    // TODO: optionally ensure provider === credential (or allow both)
    if (existing.provider === "google") {
    }

    await generateAndSendOtp(email);

    return res.json({ ok: true, message: "OTP sent for login" });
  } catch (err) {
    return next(err);
  }
}

/* -------- Login verify -------- */
export async function loginVerify(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = res.locals.validated as LoginVerifySchemaT;
    const email = body.email.toLowerCase();

    const user = await findUserByEmail(email);
    if (!user)
      throw new ApiError(
        "User not found. Please sign up first",
        404,
        "user_not_found"
      );

    // verify OTP
    await verifyOtpAndConsume(email, body.code);

    const token = issueJwtForUser(user);

    const data = {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        dob: user.dob ? user.dob.toISOString() : undefined,
        provider: user.provider,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
      },
    };
    // set cookie conditionally
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
    };

    if (body.rememberMe) {
      Object.assign(cookieOptions, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    }

    res.cookie("token", token, cookieOptions);

    return res.json(data);
  } catch (err) {
    return next(err);
  }
}

export async function getMe(req: Request, res: Response) {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  const user = req?.user as User;

  return res.json(user);
}

export const logout = async (req: Request, res: Response) => {
  try {
    // Clear the auth cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

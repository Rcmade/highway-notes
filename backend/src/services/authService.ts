// src/services/auth.service.ts
import { db } from "@/db/db";
import { ApiError } from "@/middlewares/errorHandler";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { signJwt } from "../utils/jwt";
import { SendService } from "./sendService";
// import { sendOtpEmail } from "../utils/mailer";

const OTP_LENGTH = 6;
const OTP_TTL_MIN = Number(process.env.OTP_TTL_MIN || 10);
const OTP_HASH_ROUNDS = 10;

function genOtpNumeric(len = OTP_LENGTH) {
  return String(Math.floor(Math.random() * Math.pow(10, len))).padStart(
    len,
    "0"
  );
}

/**
 * Generate OTP, hash it, store it and email the user.
 * - Does NOT decide if flow is signup or login; caller should check user existence before calling if needed.
 */
export async function generateAndSendOtp(email: string) {
  const code = genOtpNumeric();
  const salt = await bcrypt.genSalt(OTP_HASH_ROUNDS);
  const codeHash = await bcrypt.hash(code, salt);
  const expiresAt = new Date(Date.now() + OTP_TTL_MIN * 60 * 1000);

  await db.otp.create({
    data: {
      email: email.toLowerCase(),
      codeHash,
      expiresAt,
    },
  });

  await SendService.sendRegistrationEmail(email, code);

  return { ok: true };
}

/**
 * Verify OTP (returns user-friendly errors via ApiError).
 * Leaves OTP record as used (marks used=true) if successful.
 */
export async function verifyOtpAndConsume(email: string, code: string) {
  const record = await db.otp.findFirst({
    where: { email: email.toLowerCase(), used: false },
    orderBy: { createdAt: "desc" },
  });

  if (!record) throw new ApiError("OTP not found or already used", 400);
  if (record.expiresAt < new Date()) throw new ApiError("OTP expired", 400);

  const match = await bcrypt.compare(code, record.codeHash);
  if (!match) throw new ApiError("Invalid OTP code", 400);

  // mark used
  await db.otp.update({
    where: { id: record.id },
    data: { used: true },
  });

  return true;
}

/* -------- User helpers -------- */

export async function findUserByEmail(email: string) {
  return db.user.findUnique({ where: { email: email.toLowerCase() } });
}

export async function createCredentialUser(payload: {
  email: string;
  name: string;
  dob: Date;
}) {
  // Ensure uniqueness; if exists, throw conflict
  const existing = await findUserByEmail(payload.email);
  if (existing)
    throw new ApiError(
      "User already exists",
      400
      // "user_exists"
    );
  return db.user.create({
    data: {
      email: payload.email.toLowerCase(),
      name: payload.name,
      dob: payload.dob,
      provider: "credential",
    },
  });
}

export function issueJwtForUser(user: User) {
  const token = signJwt(user);
  return token;
}

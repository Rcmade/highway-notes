import type { z } from "zod";
import { email, object, string } from "zod";

export const signUpSchema = object({
  name: string().min(2, "Name must be at least 2 characters"),
  dob: string().min(1, "Date of birth is required"),
  email: email("Enter a valid email"),
  otp: string().min(4, "OTP must be at least 4 characters"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;

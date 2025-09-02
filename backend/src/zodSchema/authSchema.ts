import { email, string, z } from "zod";

const authObj = {
  name: string().min(2, "Name must be at least 2 characters"),
  dob: z.string().refine((s) => !Number.isNaN(new Date(s).getTime()), {
    message: "Invalid dob (use YYYY-MM-DD)",
  }),
  email: email("Enter a valid email"),
  code: z.string().min(4).max(8),
};

export const signupSchema = z.object({
  ...authObj,
});
export type SignupSchemaT = z.infer<typeof signupSchema>;

export const signupVerifySchema = z.object({
  ...authObj,
});

export type SignupVerifySchemaT = z.infer<typeof signupVerifySchema>;

export const loginSchema = z.object({
  email: authObj.email,
});
export type LoginSchemaT = z.infer<typeof loginSchema>;

export const loginVerifySchema = z.object({
  email: authObj.email,
  code: authObj.code,
  rememberMe: z.boolean().default(false),
});
export type LoginVerifySchemaT = z.infer<typeof loginVerifySchema>;

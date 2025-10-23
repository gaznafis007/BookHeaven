import { z } from "zod";

export const userValidator = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  // optional referral code from query/frontend: e.g. ?r=LINA123
  referredBy: z.string().optional().nullable(),
});

export type User = z.infer<typeof userValidator>;

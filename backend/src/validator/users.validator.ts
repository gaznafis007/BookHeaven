import { z } from "zod";

/**
 * User input validation schema
 */
export const userValidator = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  referredBy: z.string().optional().nullable(),
});

/**
 * Type inferred from userValidator
 */
export type User = z.infer<typeof userValidator>;

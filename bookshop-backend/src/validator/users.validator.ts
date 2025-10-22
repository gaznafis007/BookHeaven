import { z } from "zod";

export const userValidator = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type User = z.infer<typeof userValidator>;

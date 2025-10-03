// Validation schema for login form
import { z } from "zod";

// Schema for user login validation
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});
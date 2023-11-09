import { z } from "zod";

export const SignUpEmailVerificationTokenSchema = z
  .string({ description: "Token is required" })
  .length(6, { message: "Token must be 6 characters" })
  .refine(
    (val) => {
      // check if it's a string containing 6 numbers only
      return /^\d{6}$/.test(val);
    },
    {
      message: "Token must consists only of numbers",
    }
  );

export const PasswordChangeEmailVerificationTokenSchema = z
  .string({ description: "Token is required" })
  .length(8, { message: "Token must be 8 characters" });

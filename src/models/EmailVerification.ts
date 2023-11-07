import {z} from "zod";

export const EmailVerificationTokenSchema = z.object({
  token: z.string({description: "Token is required"}).length(6, {message: "Token must be 6 characters"}),
});

export type EmailVerificationToken = z.infer<typeof EmailVerificationTokenSchema>;
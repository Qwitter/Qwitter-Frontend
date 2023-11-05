import {z} from "zod";

export const EmailVerificationTokenSchema = z.object({
  token: z.number({description: "Token Must be a number"}).int("Token must be an integer").positive("Token must be a positive integer"),
});
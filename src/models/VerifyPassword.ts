import { z } from "zod";

export const VerifyPasswordSchema = z.object({
    Password: z.string().min(1)
})
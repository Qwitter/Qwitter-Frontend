import { z } from "zod";

export const CreateTweetSchema = z.object({
    Text: z.string().min(1).max(280)
})
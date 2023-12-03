import { z } from "zod";

export const GroupNameSchema = z.object({
    groupName: z.string().min(1).max(50)
})
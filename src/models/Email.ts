import { z } from "zod";
export const EmailSchema = z.object({
    email: z.string({ required_error: "Email is Required" }).email("Must be an email").trim()
});

export type Email = z.infer<typeof EmailSchema>;
import { isAvailableUserNameOrEmail } from "@/lib/utils";
import { z } from "zod";
export const EmailSchema = z.object({
    email: z.string({ required_error: "Email is Required" }).email("Must be an email").trim()
});
export const EmailAPISchema = EmailSchema.extend({
    email: EmailSchema.shape.email.refine(async(email) => await isAvailableUserNameOrEmail(email), {
        message: "Email has already been taken."
    })
})
export type Email = z.infer<typeof EmailSchema>;
export type EmailAPI = z.infer<typeof EmailAPISchema>;
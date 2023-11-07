import {EmailSchema } from './Email';
import { z } from "zod";



export const SignInSchema = EmailSchema.extend({
    password: z.string()
        .min(8, { message: "Your password needs to be at least 8 characters. Please enter a longer one." })
        .refine((password) => {
            return /[A-Za-z]/.test(password) && /\d/.test(password);
        }, { message: "Password must contain at least one letter and one number" })
})
export type SignIn = z.infer<typeof SignInSchema>;
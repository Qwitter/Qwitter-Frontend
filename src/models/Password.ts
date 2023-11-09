import { z } from "zod";

export const PasswordSchema = z.object({
    Password: z.string()
        .min(8, { message: "Your password needs to be at least 8 characters. Please enter a longer one." })
        .refine((password) => {
            return /[A-Za-z]/.test(password) && /\d/.test(password);
        }, { message: "Password must contain at least one letter and one number" }),
    ConfirmPassword: z.string(),
    CurrentPassword:z.string().optional()

}).refine((data) => data.Password === data.ConfirmPassword, {
    message: "Passwords doesn't match",
    path: ["ConfirmPassword"],
})
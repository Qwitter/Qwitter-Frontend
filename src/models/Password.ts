import { verifyPassword } from "@/lib/utils";
import { z } from "zod";

export const PasswordSchema = z.object({
    Password: z.string()
        .min(8, { message: "Your password needs to be at least 8 characters. Please enter a longer one." })
        .refine((password) => {
            return /[A-Za-z]/.test(password);
        }, { message: " Password must contain at least one letter" }),
    ConfirmPassword: z.string(),
}).refine((data) => data.Password === data.ConfirmPassword, {
    message: "Password do not match",
    path: ["ConfirmPassword"],
});

export const PasswordAPISchema = z.object({
    CurrentPassword: z.string(),
    Password: z.string().min(8, { message: "Your password needs to be at least 8 characters. Please enter a longer one." })
        .refine((password) => {
            return /[A-Za-z]/.test(password) ;
        }, { message: " Password must contain at least one letter" }),
    ConfirmPassword: z.string(),
    Token: z.string(), // Add the token field
}).refine((data) => data.Password === data.ConfirmPassword, {
    message: "Password do not match",
    path: ["ConfirmPassword"],
}).refine(async (data) => {
    try{
    return await verifyPassword({ password: data.CurrentPassword, token: data.Token })
    }catch(e){
        return false
    }
}, {
    message: "The password you entered was incorrect.",
    path: ["CurrentPassword"],
}).refine((data)=>data.Password !== data.CurrentPassword,{
    message:"New password cannot be the same as your existing password.",
    path:["Password"]
})
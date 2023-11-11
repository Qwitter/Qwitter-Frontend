import { isAvailableUsername } from "@/lib/utils";
import { z } from "zod";

export const UsernameSchema = z.object({
    username: z.string({ required_error: "username is Required" })
        .min(5, { message: "Your username must be longer than 4 characters." })
        .max(15, { message: "Username cannot be longer than 15 characters" })
        .refine(username => /[^\d]/.test(username), {
            message: "Username must contain at least one non-numeric character",
        })
        .refine(username => /^[a-zA-Z0-9_]+$/.test(username), {
            message: "Username can only contain letters, numbers, and underscores",
        }).refine(async (username) => {
            if (username.length < 4||username.length > 15) {
                return false;
            }
            if (await isAvailableUsername(username)) {
                return true;
            }
            return false;
        }
            , { message: "That username has been taken. Please choose another.", })
})

export type Username = z.infer<typeof UsernameSchema>;
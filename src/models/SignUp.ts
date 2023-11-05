import { z } from "zod";
import { BirthDaySchema } from "@/models/BirthDay";

export const SignUpSchema = z.object({
  name: z.string().max(50).nullish(),
  email: z.string().email().nullish(),
  password: z.string().min(8).nullish(),
  birthDay: BirthDaySchema.nullish(),
});

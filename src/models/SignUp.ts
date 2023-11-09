import { z } from "zod";
import { BirthDaySchema } from "@/models/BirthDay";
import { MouseEventHandler } from "react";
import { findEmail } from "@/lib/utils";

// schema that holds name, email, birthday
export const Step1DataSchema = z.object({
  name: z.string().trim().min(1, "Please enter a name").max(50),
  email: z.string().trim().email("Please enter a valid email"),
  day: BirthDaySchema.shape.day,
  month: BirthDaySchema.shape.month,
  year: BirthDaySchema.shape.year,
});

// schema holds name, email, birthday and checks for the availability of the email
export const RefinedStep1DataSchema = z.object({
  name: Step1DataSchema.shape.name,
  // NEEDED: apply some changes so that it doesn't get called with every change
  email: Step1DataSchema.shape.email.refine(async (email) => {
    if (email) {
      const data = await findEmail(email);
      if (data === null) return false;
      return !data.data;
    }
  }, "Email has already been taken"),
  day: Step1DataSchema.shape.day,
  month: Step1DataSchema.shape.month,
  year: Step1DataSchema.shape.year,
});

// schema that holds the password with its checks
export const Step5DataSchema = z.object({
  password: z
    .string()
    .min(8, {
      message:
        "Your password needs to be at least 8 characters. Please enter a longer one.",
    })
    .refine(
      (password) => {
        return /[A-Za-z]/.test(password);
      },
      { message: "Password must contain at least one letter" }
    ),
});

// schema that holds all data
export const SignUpDataSchema = z.object({
  // nullish is used only to accept the initial state of the user data
  name: Step1DataSchema.shape.name.nullish(),
  email: Step1DataSchema.shape.email.nullish(),
  password: Step5DataSchema.shape.password.nullish(),
  day: Step1DataSchema.shape.day.nullish(),
  month: Step1DataSchema.shape.month.nullish(),
  year: Step1DataSchema.shape.year.nullish(),
});

// props for all sign up steps
export type SignUpStepsProps = {
  nextStep: () => void; // will run when next is pressed
  resetStep?: MouseEventHandler<HTMLDivElement>; // for step 3
  userData?: z.infer<typeof SignUpDataSchema>; // to pass data between step 1, 3 & 5
};
